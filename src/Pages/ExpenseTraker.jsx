import { useEffect, useState } from "react";
import ExpenseForm from "../Component/Expense/ExpenseForm";
import CalculateTheSpends from "../Component/Expense/CalculateTheSpends";
import { DeleteTransactions, GetTransactions } from "../Api/Service.js";
import {
  Breadcrumbs,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ExpenseTrake = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

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

  const breadcrumbs = [
    <Link underline='hover' key='1' color='inherit' to='/reactapphost/'>
      Home
    </Link>,

    <Typography key='3' color='text.primary'>
      Expense Tracker
    </Typography>,
  ];

  return (
    <div className='mt-2'>
      <Stack className='ms-3 align-self-center' spacing={2}>
        <Breadcrumbs separator='›' aria-label='breadcrumb'>
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <ExpenseForm onAddExpense={addExpense} getData={getData} />
      <div className='row p-0'>
        {expenses.length > 0 ? (
          <div className='col-md-12'>
            <CalculateTheSpends
              expenses={expenses}
              onDeleteExpense={deleteExpense}
            />
          </div>
        ) : loading && expenses.length === 0 ? (
          <div className='col-md-12 d-flex justify-content-center align-items-center'>
            <CircularProgress /> {/* Display circular progress */}
          </div>
        ) : (
          loading &&
          expenses.length === 0 && (
            <div className='col-md-12'>
              <h1 className='text-center mt-3'>No Data Available</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExpenseTrake;
