import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import { AddTransactions } from "../../services/services";
import useToast from "../../hooks/useToast";
import FloatingLabelInput from "../../modules/FloatingLabelInput";

const ExpenseModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const addToast = useToast();

  const onSubmit = (data) => {
    AddTransactions(data)
      .then(({ data }) => {
        reset();
        addToast("success", data.message);
        onClose(true);
      })
      .catch((err) => {
        addToast(
          "error",
          err?.data?.message || "Something went wrong. Please try again."
        );
      });
  };

  return (
    <>
      <div className='modal fade show d-block' tabIndex='-1' role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header flex items-center justify-between p-4 border-b'>
              <h5 className='modal-title text-lg font-semibold'>Add Expense</h5>
              <button
                type='button'
                className=' transition-colors duration-200'
                onClick={() => onClose(false)}
                aria-label='Close'
              >
                <CgCloseO className='w-6 h-6' />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='modal-body p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <FloatingLabelInput
                      type='text'
                      name='title'
                      label='Title'
                      register={register("title", {
                        required: {
                          value: true,
                          message: "Title is required.",
                        },
                      })}
                      error={errors["title"]}
                    />
                  </div>
                  <div>
                    <FloatingLabelInput
                      type='number'
                      name='amount'
                      label='Amount'
                      register={register("amount", {
                        required: {
                          value: true,
                          message: "Amount is required.",
                        },
                      })}
                      error={errors["amount"]}
                    />
                  </div>
                  <div className='col-span-full'>
                    <label htmlFor='type' className='block text-lg mb-1'>
                      Transaction Type
                    </label>
                    <select
                      className='form-control peer w-full py-3 px-2 border rounded-md shadow-sm'
                      id='type'
                      {...register("type", {
                        required: { value: true, message: "Type is required." },
                      })}
                    >
                      <option value=''>Select a type</option>
                      <option value='spent'>Spent</option>
                      <option value='credited'>Credited</option>
                    </select>
                    {errors.type && (
                      <div className='text-red-500 text-sm mt-1'>
                        {errors.type.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='modal-footer p-0 flex'>
                <button
                  type='submit'
                  className='flex-1 py-3 border-t border-r rounded-bl m-0 bg-blue-700'
                >
                  Save
                </button>
                <button
                  type='button'
                  className='flex-1 py-3 border-t rounded-br m-0 bg-gray-700'
                  onClick={() => onClose(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  );
};

ExpenseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ExpenseModal;
