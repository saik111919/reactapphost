import { useEffect, useState } from "react";
import ExpenseForm from "../Component/Expense/ExpenseForm";
import CalculateTheSpends from "../Component/Expense/CalculateTheSpends";
import { DeleteTransactions, GetTransactions } from "../Api/Service.js";
import { Link } from "react-router-dom";
import {useToast} from "../Plugins/Toast/ToastContext"

const ExpenseTrake = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const addToast = useToast()

  function deleteTransactions(id) {
    DeleteTransactions(id)
      .then(({ data }) => {
        console.log(data);
        getData();
        addToast('warning', data.message, 5000)
      })
      .catch((err) => {
        console.error(err);
        addToast('error', err.data.message || "Somthing went wrong", 5000)
      });
  }

  const deleteExpense = (id) => {
    deleteTransactions(id);
  };

  function getData() {
    setLoading(true);
    GetTransactions()
      .then(({ data }) => {
        setExpenses(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const breadcrumbs = [
    <Link key='1' to='/reactapphost/'>
      Home
    </Link>,
    <span key='3' className='text-primary'>
      Expense Tracker
    </span>,
  ];

  return (
    <div className='mt-2'>
      <div className='ms-3 align-self-center mb-3'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            {breadcrumbs.map((breadcrumb, index) => (
              <li className='breadcrumb-item' key={index}>
                {breadcrumb}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <ExpenseForm getData={getData} />
      <div className='row p-0'>
        {loading && expenses.length === 0 ? (
          <div className='col-md-12 d-flex justify-content-center align-items-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : expenses.length > 0 ? (
          <div className='col-md-12'>
            <CalculateTheSpends
              expenses={expenses}
              onDeleteExpense={deleteExpense}
              showTable={true}
            />
          </div>
        ) : (
          <div className='col-md-12'>
            <h1 className='text-center mt-3'>No Data Available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTrake;
