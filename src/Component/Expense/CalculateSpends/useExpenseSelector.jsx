import { useState, useEffect } from "react";

const useExpenseSelector = (groupedTransactions) => {
  const monthOptions = Object.keys(groupedTransactions);
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0] || "");

  // Calculate the available day options for the selected month
  const dayOptions = selectedMonth
    ? Object.keys(groupedTransactions[selectedMonth]).sort((a, b) => b - a) // Sort days in descending order
    : [];

  // Initialize selectedDay to the last date available in dayOptions
  const [selectedDay, setSelectedDay] = useState(dayOptions[0] || "");

  useEffect(() => {
    if (!monthOptions.includes(selectedMonth)) {
      setSelectedMonth(monthOptions[0] || "");
    }
  }, [monthOptions, selectedMonth]);

  useEffect(() => {
    // Update selectedDay if it is not included in the updated dayOptions
    if (selectedMonth && !dayOptions.includes(selectedDay)) {
      setSelectedDay(dayOptions[0] || "");
    }
  }, [selectedMonth, dayOptions, selectedDay]);

  return {
    selectedMonth,
    setSelectedMonth,
    selectedDay,
    setSelectedDay,
    monthOptions,
    dayOptions,
  };
};

export default useExpenseSelector;
