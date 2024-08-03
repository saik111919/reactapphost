import ExpenseForm from "../../component/expense/ExpenseForm";
import useToast from "../../hooks/useToast";
import useTransaction from "../../hooks/useTransaction";
import { DeleteTransactions } from "../../services/services";

const ExpenseTraker = () => {
  const { data, LoaderComp, setLoader, fetchTransactions } = useTransaction();
  const addToast = useToast();

  function deleteTransactions(id) {
    setLoader(true);
    DeleteTransactions(id)
      .then(({ data }) => {
        fetchTransactions();
        addToast("info", data.message);
      })
      .catch((err) => {
        addToast("error", err?.data?.message || "Error Ocured.");
      })
      .finally(() => {
        setLoader(false);
      });
  }

  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteTransactions(id);
    }
  };
  return (
    <>
      <LoaderComp />
      <ExpenseForm
        data={data}
        onDeleteExpense={deleteExpense}
        fetchTransactions={fetchTransactions}
      />
    </>
  );
};
export default ExpenseTraker;
