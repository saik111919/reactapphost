import { useEffect, useState } from "react";
import CalculateTheSpends from "../Component/Expense/CalculateTheSpends";
import { DeleteTransactions, GetTransactions } from "../Api/Service.js";
import { Link } from "react-router-dom";
import { useToast } from "../Plugins/Toast/ToastContext";
import Loader from "../Utils/Loader.jsx";

const ExpenseTrake = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  function deleteTransactions(id) {
    setLoading(true);
    DeleteTransactions(id)
      .then(({ data }) => {
        console.log(data);
        getData();
        addToast("warning", data.message, 5000);
      })
      .catch((err) => {
        console.error(err);
        addToast("error", err.data.message || "Somthing went wrong", 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteTransactions(id);
    }
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
    <>
      <Loader loader={loading} />
      <div className='mt-2'>
        <div className='card mb-2'>
          <nav aria-label='breadcrumb' className='card-body'>
            <ol className='breadcrumb m-0'>
              {breadcrumbs.map((breadcrumb, index) => (
                <li className='breadcrumb-item' key={index}>
                  {breadcrumb}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className='row p-0'>
          {loading && expenses.length === 0 ? (
            <div className='col-md-12 my-1'>
              <div className='card'>
                <div className='card-body row'>
                  <div className='col-md-12 d-flex justify-content-center align-items-center'>
                    <span>Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          ) : expenses.length > 0 ? (
            <div className='col-md-12'>
              <CalculateTheSpends
                expenses={expenses}
                onDeleteExpense={deleteExpense}
                showTable={true}
                getData={getData}
              />
            </div>
          ) : (
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-body row'>
                  <span className='text-center'>No Data Available</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseTrake;
