import { useState, useEffect } from "react";

const useExpenseTracker = (data = []) => {
  const formatMonth = (month) => {
    const [year, monthNum] = month.split("-");
    return `${year}-${monthNum.padStart(2, "0")}`;
  };

  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const lastMonthData =
    data.length > 0 ? data[data.length - 1].monthYear : getCurrentMonth();
  const formattedLastMonth = formatMonth(lastMonthData);

  const [selectedMonth, setSelectedMonth] = useState(formattedLastMonth);

  useEffect(() => {
    setSelectedMonth(formattedLastMonth);
  }, [formattedLastMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredData = data.find(
    (item) => formatMonth(item.monthYear) === selectedMonth
  ) || { transactions: [] };

  const transactions = filteredData.transactions;

  const totalSpent = transactions
    .filter((transaction) => transaction.type === "spent")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalCredited = transactions
    .filter((transaction) => transaction.type === "credited")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const remainingAmount = totalCredited - totalSpent;

  return {
    selectedMonth,
    handleMonthChange,
    transactions,
    totalSpent,
    totalCredited,
    remainingAmount,
    formattedLastMonth,
  };
};

export default useExpenseTracker;
