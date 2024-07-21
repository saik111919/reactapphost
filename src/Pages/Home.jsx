import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { DeleteTransactions, GetTransactions } from "../Api/Service";
import Loader from "../Utils/Loader";
import ArrowRight from "../assets/images/ArrowRight";

const CalculateTheSpends = lazy(() =>
  import("../Component/Expense/CalculateTheSpends")
);

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  function deleteTransactions(id) {
    DeleteTransactions(id)
      .then(({ data }) => {
        console.log(data);
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense._id !== id)
    );
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

  return (
    <div>
      <Loader loader={loading} />
      <div className='row'>
        <div className='col-md-6 col-lg-4 mb-1  mb-sm-0'>
          <div className='card shadow-sm h-100'>
            <div className='card-body'>
              <h5 className='card-title'>Expense Tracker</h5>
              <p className='card-text m-0'>
                Track and manage your expenses effectively.
              </p>
            </div>
            <div className='card-footer d-flex justify-content-end'>
              <Link to={"/reactapphost/expense"} className='btn btn-primary'>
                <div className='d-flex gap-1 justify-content-center align-items-center'>
                  Go to Expense Tracker <ArrowRight />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-md-6 col-lg-8'>
          {!loading && (
            <Suspense
              fallback={
                <div className='text-center mt-4'>
                  <h5>Loading...</h5>
                </div>
              }
            >
              <CalculateTheSpends
                expenses={expenses}
                onDeleteExpense={deleteExpense}
                showTable={false}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
