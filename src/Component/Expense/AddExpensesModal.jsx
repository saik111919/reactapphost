import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useToast } from "../../Plugins/Toast/ToastContext";
import { AddTransactions } from "../../Api/Service";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { tags } from "../../Utils/Constent";

export default function AddExpensesModal({ getData }) {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addToast = useToast();

  function handleModal(state = false) {
    reset();
    setShow(state);
  }

  const onSubmit = (data) => {
    AddTransactions(data)
      .then(({ data }) => {
        getData();
        reset();
        addToast("success", data.message, 5000);
        handleModal(false);
      })
      .catch((err) => {
        addToast("error", err?.data?.message || "Somthing went wrong.", 5000);
      });
  };

  return (
    <>
      <button
        className='btn btn-outline-primary d-flex align-items-center gap-2'
        onClick={() => {
          handleModal(true);
        }}
      >
        {" "}
        <IoMdAddCircleOutline width={24} /> Add Expanses
      </button>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        tabIndex='-1'
        role='dialog'
      >
        <div className='modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Expenses</h5>
              <button
                type='button'
                className='btn btn-close'
                aria-label='Close'
                onClick={() => {
                  handleModal(false);
                }}
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='modal-body'>
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
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => {
                    handleModal(false);
                  }}
                >
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {show && (
        <div className='modal-backdrop fade show custom-modal-backdrop'></div>
      )}
    </>
  );
}

AddExpensesModal.propTypes = {
  getData: PropTypes.func.isRequired,
};
