import { FaCreditCard, FaMoneyBillAlt, FaRupeeSign } from "react-icons/fa";
import useExpenseTracker from "../../hooks/useExpenseTracker";
import useTransaction from "../../hooks/useTransaction";
import StatCard from "./StatCard";

const ExpenseTrackerCard = () => {
  const { data, LoaderComp } = useTransaction();

  const {
    selectedMonth,
    handleMonthChange,
    transactions,
    totalSpent,
    totalCredited,
    remainingAmount,
    formattedLastMonth,
  } = useExpenseTracker(data);
  return (
    <>
      <LoaderComp />
      <div className='card mt-2 bg-inherit border rounded-lg'>
        <div className='card-header p-0 flex justify-between align-middle border-b rounded-t-lg'>
          <h3 className='self-center drop-shadow-lg px-3'>
            Expenses {selectedMonth && "for"} {selectedMonth}
          </h3>
          <div className='flex items-center'>
            <input
              type='month'
              value={selectedMonth}
              onChange={handleMonthChange}
              max={formattedLastMonth}
              className='bg-inherit border border-inherit rounded-tr-lg p-3 text-inherit placeholder-inherit focus:outline-none focus:ring-2 focus:ring-inherit transition-colors duration-200 ease-in-out'
              placeholder='Select month'
            />
          </div>
        </div>
        {transactions.length === 0 ? (
          <div className='card-body p-4 text-center'>
            <p className='text-lg font-medium text-gray-500'>
              No transactions available {selectedMonth && "for"} {selectedMonth}
              .
            </p>
          </div>
        ) : (
          <div className='card-body flex flex-wrap p-0'>
            <StatCard
              title='Spent'
              value={totalSpent}
              icon={FaRupeeSign}
              iconColor='text-green-500'
            />
            <StatCard
              title='Credited'
              value={totalCredited}
              icon={FaCreditCard}
              iconColor='text-blue-500'
            />
            <StatCard
              title='Remaining Amount'
              value={remainingAmount}
              icon={FaMoneyBillAlt}
              iconColor='text-red-500'
            />
          </div>
        )}
      </div>
    </>
  );
};
export default ExpenseTrackerCard;
