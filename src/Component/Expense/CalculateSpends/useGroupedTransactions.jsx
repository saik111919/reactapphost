import { useMemo, useState, useEffect } from "react";

const useGroupedTransactions = (transactions) => {
  const groupedTransactions = useMemo(() => {
    const grouped = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt);
      const monthYear = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      });
      const day = date.getDate();

      if (!grouped[monthYear]) {
        grouped[monthYear] = {};
      }

      if (!grouped[monthYear][day]) {
        grouped[monthYear][day] = [];
      }

      grouped[monthYear][day].push(transaction);
    });
    return grouped;
  }, [transactions]);

  return groupedTransactions;
};

export default useGroupedTransactions;
