import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { AddTransactions } from "../../Api/Service";

const ExpenseForm = ({ getData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const tags = [
    { value: "spent", label: "Amount Spent" },
    { value: "credited", label: "Amount Credited" },
  ];

  const onSubmit = (data) => {
    reset();
    AddTransactions(data)
      .then((data) => {
        console.log(data);
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='card shadow-sm mt-3 mb-1 p-2'>
      <div className='accordion' id='expenseFormAccordion'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingOne'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='false'
              aria-controls='collapseOne'
            >
              Add Expenses
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse'
            aria-labelledby='headingOne'
            data-bs-parent='#expenseFormAccordion'
          >
            <div className='accordion-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='title' className='form-label'>
                      Title
                    </label>
                    <input
                      id='title'
                      type='text'
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                      <div className='invalid-feedback'>
                        {errors.title.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='amount' className='form-label'>
                      Amount
                    </label>
                    <input
                      id='amount'
                      type='number'
                      className={`form-control ${
                        errors.amount ? "is-invalid" : ""
                      }`}
                      {...register("amount", {
                        required: "Amount is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          value > 0 || "Amount must be greater than 0",
                      })}
                    />
                    {errors.amount && (
                      <div className='invalid-feedback'>
                        {errors.amount.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='type' className='form-label'>
                      Type
                    </label>
                    <select
                      id='type'
                      className={`form-select ${
                        errors.type ? "is-invalid" : ""
                      }`}
                      {...register("type", { required: "Type is required" })}
                    >
                      <option value=''>Select type...</option>
                      {tags.map((tag) => (
                        <option key={tag.value} value={tag.value}>
                          {tag.label}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <div className='invalid-feedback'>
                        {errors.type.message}
                      </div>
                    )}
                  </div>
                  <div className='col-12 mb-3'>
                    <button type='submit' className='btn btn-primary w-100'>
                      Add Expense
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ExpenseForm.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default ExpenseForm;
