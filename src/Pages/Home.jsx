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
      <Link
        to={"/reactapphost/expense"}
        className='btn btn-outline-primary mb-1'
      >
        <div className='d-flex gap-1 justify-content-center align-items-center'>
          ExpenseTracker <ArrowRight />
        </div>
      </Link>
      {!loading && expenses.length > 0 && (
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
  );
};

export default Home;
