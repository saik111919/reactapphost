import PropTypes from "prop-types";
import { CgAdd } from "react-icons/cg";
// import ExpenseModal from "./ExpenseModal";
import { useState } from "react";
import DataTable from "./DataTable";
import ExpenseModal from "./ExpenseModal";

const ExpenseForm = ({ data, onDeleteExpense, fetchTransactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (state) => {
    setIsModalOpen(false);
    if (state) {
      fetchTransactions();
    }
  };

  return (
    <div className='card mt-2 rounded-lg border-2'>
      <div className='card-header rounded-t-lg  border-b-2 p-0'>
        <div className='flex justify-between'>
          <span className='text-lg self-center p-2'>Add Expense</span>
          <button
            className='p-3 shadow py-1 btn btn-outline-primary rounded-start-0 rounded-bottom-0'
            type='button'
            onClick={handleOpenModal}
          >
            <div className='flex align-middle gap-2 text-inherit lg:p-3 p-2'>
              <CgAdd className='self-center' /> Add Expense
            </div>
          </button>
        </div>
      </div>
      <div className='card-body p-0'>
        {isModalOpen && <ExpenseModal onClose={handleCloseModal} />}
        <DataTable data={data} onDeleteExpense={onDeleteExpense} />
      </div>
    </div>
  );
};

ExpenseForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};

export default ExpenseForm;
