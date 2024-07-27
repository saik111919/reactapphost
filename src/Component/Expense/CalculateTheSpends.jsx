import React from "react";
import PropTypes from "prop-types";
import DeleteSvg from "../../assets/images/DeleteSvg";
import CreditSvg from "../../assets/images/CreditSvg";
import SpentSvg from "../../assets/images/SpentSvg";
import MoneySvg from "../../assets/images/MoneySvg";
import AddExpensesModal from "./AddExpensesModal";
import useGroupedTransactions from "./CalculateSpends/useGroupedTransactions";
import useExpenseSelector from "./CalculateSpends/useExpenseSelector";

const CalculateTheSpends = ({
  expenses,
  onDeleteExpense,
  showTable = true,
  getData,
}) => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <h6>No expenses available</h6>;
  }

  if (typeof onDeleteExpense !== "function") {
    return <h6>Error: Invalid onDeleteExpense handler</h6>;
  }

  const expenseData = expenses[0];
  const groupedTransactions = useGroupedTransactions(expenseData.transactions);
  const {
    selectedMonth,
    setSelectedMonth,
    selectedDay,
    setSelectedDay,
    monthOptions,
    dayOptions,
  } = useExpenseSelector(groupedTransactions);

  const getCardClasses = (type) => {
    return `card p-3 flex-fill ${
      type === "spent"
        ? "border-danger text-danger"
        : "border-success text-success"
    }`;
  };

  return (
    <div className='card shadow-sm'>
      <div
        className={
          showTable ? "card-header d-flex justify-content-between " : ""
        }
      >
        <h5 className={showTable ? "align-self-center mb-0" : "ps-3 p-2 mb-0"}>
          Expense Details
        </h5>
        {showTable && <AddExpensesModal getData={getData} />}
      </div>
      <div className='card-body'>
        <div className='d-flex gap-2'>
          {monthOptions.length > 1 && (
            <div className='mb-3 flex-fill'>
              <label htmlFor='monthSelect' className='form-label'>
                Month
              </label>
              <select
                id='monthSelect'
                className='form-select'
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showTable && (
            <div className='mb-3 flex-fill'>
              <label htmlFor='daySelect' className='form-label'>
                Day
              </label>
              <select
                id='daySelect'
                className='form-select'
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {dayOptions.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {!showTable && (
          <div className='d-flex justify-content-between mb-3 flex-wrap gap-3'>
            <div className={getCardClasses("spent")}>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h6>Total Spent</h6>
                  <p>₹{expenseData.totalSpent.toFixed(2)}</p>
                </div>
                <div className='money-icon'>
                  <SpentSvg />
                </div>
              </div>
            </div>
            <div className={getCardClasses("credited")}>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h6>Total Credited</h6>
                  <p>₹{expenseData.totalCredited.toFixed(2)}</p>
                </div>
                <div className='money-icon'>
                  <CreditSvg />
                </div>
              </div>
            </div>
            <div className='card p-3 flex-fill border-info text-info'>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h6>Remaining Amount</h6>
                  <p>₹{expenseData.remainingAmount.toFixed(2)}</p>
                </div>
                <div className='money-icon'>
                  <MoneySvg />
                </div>
              </div>
            </div>
          </div>
        )}

        {showTable &&
          selectedMonth &&
          selectedDay &&
          groupedTransactions[selectedMonth] &&
          groupedTransactions[selectedMonth][selectedDay] && (
            <div>
              <div className='card p-2 mb-3 card-height-small-screen'>
                <h6 className='m-0 p-2'>{`${selectedMonth}, ${selectedDay}`}</h6>
              </div>
              <div className='table-responsive expense-table'>
                <table className='table table-bordered table-hover'>
                  <thead className='thead-light sticky-top'>
                    <tr>
                      <th className='text-center'>Title</th>
                      <th className='text-center'>Amount</th>
                      <th className='text-center'>Action</th>
                      <th className='text-center'>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedTransactions[selectedMonth][selectedDay].map(
                      (transaction) => (
                        <tr key={transaction._id}>
                          <td
                            className='text-center text-truncate'
                            style={{ maxWidth: "100px" }}
                            title={transaction.title}
                          >
                            {transaction.title}
                          </td>
                          <td className='text-center'>
                            ₹{transaction.amount.toFixed(2)}
                          </td>
                          <td className='text-center'>
                            <button
                              className='btn btn-danger'
                              onClick={() => onDeleteExpense(transaction._id)}
                            >
                              <DeleteSvg />
                            </button>
                          </td>
                          <td className='text-center align-content-center'>
                            <span
                              className={`badge ${
                                transaction.type === "spent"
                                  ? "bg-danger text-white"
                                  : "bg-success text-white"
                              }`}
                            >
                              {transaction.type.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

// Prop types definition for CalculateTheSpends component
CalculateTheSpends.propTypes = {
  showTable: PropTypes.bool,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          title: PropTypes.string,
          amount: PropTypes.number,
          type: PropTypes.oneOf(["spent", "credited"]),
          user: PropTypes.string,
          createdAt: PropTypes.string.isRequired,
        })
      ).isRequired,
      totalCredited: PropTypes.number.isRequired,
      totalSpent: PropTypes.number.isRequired,
      remainingAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  getData: PropTypes.func,
};

export default React.memo(CalculateTheSpends);
