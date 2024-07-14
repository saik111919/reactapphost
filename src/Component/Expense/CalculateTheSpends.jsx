import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DeleteSvg from "../../assets/images/DeleteSvg";
import CreditSvg from "../../assets/images/CreditSvg";
import SpentSvg from "../../assets/images/SpentSvg";
import MoneySvg from "../../assets/images/MoneySvg";

const CalculateTheSpends = ({
  expenses,
  onDeleteExpense,
  showTable = true,
}) => {
  if (!Array.isArray(expenses)) {
    console.error("Invalid prop 'expenses'. Expected an array.");
    return null;
  }

  if (typeof onDeleteExpense !== "function") {
    console.error("Invalid prop 'onDeleteExpense'. Expected a function.");
    return null;
  }

  if (expenses.length === 0) {
    return <h6>No expenses available</h6>;
  }

  const expenseData = expenses[0];

  const groupTransactionsByDate = () => {
    const groupedTransactions = {};
    expenseData.transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      if (!groupedTransactions[date]) {
        groupedTransactions[date] = [];
      }
      groupedTransactions[date].push(transaction);
    });
    return groupedTransactions;
  };

  const groupedTransactions = groupTransactionsByDate();
  const dateOptions = Object.keys(groupedTransactions);
  const dateOpetionState = dateOptions[0] || "";

  const [selectedDate, setSelectedDate] = useState(dateOpetionState);

  useEffect(() => {
    if (dateOptions.length > 0) {
      if (dateOptions.includes(selectedDate)) {
        setSelectedDate(dateOptions[dateOptions.length - 1]);
      }
    }
  }, [dateOptions, selectedDate]);

  const getCardClasses = (type) => {
    return `card p-3 flex-fill ${
      type === "spent"
        ? "border-danger text-danger"
        : "border-success text-success"
    }`;
  };

  return (
    <div className='card shadow-sm p-4 mb-4'>
      <h5 className='mb-3'>Expense Details</h5>
      <div className='mb-3'>
        <label htmlFor='dateSelect' className='form-label'>
          Date
        </label>
        <select
          id='dateSelect'
          className='form-select'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className='d-flex justify-content-between mb-3 flex-wrap gap-3'>
        <div className={getCardClasses("spent")}>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h6>Total Spent</h6>
              <p>₹{expenseData.totalSpent.toFixed(2)}</p>
            </div>
            <div className=' money-icon'>
              <SpentSvg />
            </div>{" "}
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
            </div>{" "}
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

      {showTable === true
        ? selectedDate && (
            <div>
              <div className='card p-2 mb-3'>
                <h6>{selectedDate}</h6>
              </div>
              <div
                className='table-responsive'
                style={{
                  height: "34.55em",
                  scrollbarWidth: "thin",
                }}
              >
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
                    {groupedTransactions[selectedDate].map((transaction) => (
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
                            className={` text-center ${
                              transaction.type === "spent"
                                ? "badge bg-danger text-white"
                                : "badge bg-success text-white"
                            }`}
                          >
                            {transaction.type.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        : null}
    </div>
  );
};

CalculateTheSpends.propTypes = {
  showTable: PropTypes.bool,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          title: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
          type: PropTypes.oneOf(["spent", "credited"]).isRequired,
          user: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        })
      ).isRequired,
      totalCredited: PropTypes.number.isRequired,
      totalSpent: PropTypes.number.isRequired,
      remainingAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default CalculateTheSpends;
