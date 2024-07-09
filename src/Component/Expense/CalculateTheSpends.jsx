import { Delete } from "@mui/icons-material";
import { Button } from "bootstrap";
import { Fragment } from "react";
import PropTypes from "prop-types";

const CalculateTheSpends = ({ expenses, onDeleteExpense }) => {
  if (!Array.isArray(expenses)) {
    console.error("Invalid prop 'expenses'. Expected an array.");
    return null;
  }

  if (typeof onDeleteExpense !== "function") {
    console.error("Invalid prop 'onDeleteExpense'. Expected a function.");
    return null;
  }

  // Function to calculate totals based on type
  const calculateTotalsByType = (type) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.type === type
    );
    const totalAmount = filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return totalAmount;
  };

  // Function to group expenses by date using id
  const groupExpensesByDate = () => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.createdAt).toLocaleDateString();
      if (!groupedExpenses[date]) {
        groupedExpenses[date] = [];
      }
      groupedExpenses[date].push(expense);
    });
    return groupedExpenses;
  };

  const totalsByType = {
    spent: calculateTotalsByType("spent"),
    credited: calculateTotalsByType("credited"),
  };

  const groupedExpenses = groupExpensesByDate();

  return (
    <>
      <div className='card'>
        <div className='card-header'>Expense Details</div>
        <div className='card-body'>
          <div className='d-flex flex-grow-1 gap-2 flex-wrap mb-2 mb-md-3'>
            <div className='card flex-fill'>
              <div className='card-body'>
                <h5 className='card-title'>Total Spent</h5>
                <p className='card-text'>₹{totalsByType.spent.toFixed(2)}</p>
              </div>
            </div>
            <div className='card flex-fill ml-3'>
              <div className='card-body'>
                <h5 className='card-title'>Total Credited</h5>
                <p className='card-text'>₹{totalsByType.credited.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              {Object.keys(groupedExpenses).map((date) => (
                <Fragment key={date}>
                  <div className='card mb-1'>
                    <div className='card-header broder-0'>{date}</div>
                  </div>
                  {groupedExpenses[date].map((expense) => (
                    <div className='card card-spent mb-1' key={expense._id}>
                      <div className='card-body d-flex justify-content-between align-items-center'>
                        <div>
                          <h5 className='card-title mb-0'>{expense.title}</h5>
                        </div>
                        <div className='card-text text-muted'>
                          ₹{expense.amount.toFixed(2)}
                        </div>
                        <Button onClick={() => onDeleteExpense(expense._id)}>
                          <Delete />
                        </Button>
                      </div>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CalculateTheSpends.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["spent", "credited"]).isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default CalculateTheSpends;
