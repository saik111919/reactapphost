import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import * as XLSX from "xlsx";

const DataTable = ({ data = [], onDeleteExpense }) => {
  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month}`;
  };

  const currentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedDate, setSelectedDate] = useState("");

  const filteredData = data.find(
    (item) => item.monthYear === selectedMonth
  ) || { transactions: [] };

  const uniqueDays = Array.from(
    new Set(
      filteredData.transactions.map((transaction) =>
        new Date(transaction.createdAt).getDate()
      )
    )
  ).sort((a, b) => a - b);

  const filteredTransactions = selectedDate
    ? filteredData.transactions.filter(
        (transaction) =>
          new Date(transaction.createdAt).getDate() ===
          parseInt(selectedDate, 10)
      )
    : filteredData.transactions;

  useEffect(() => {
    setSelectedDate("");
  }, [selectedMonth]);

  const handleExport = () => {
    const exportData = filteredTransactions.map(({ createdAt, ...rest }) => ({
      ...rest,
      createdAt: new Date(createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const wscols = [
      { wch: 30 }, // Title column width
      { wch: 15 }, // Amount column width
      { wch: 15 }, // Type column width
      { wch: 20 }, // Date column width
    ];

    worksheet["!cols"] = wscols;

    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1";
      if (!worksheet[address]) continue;
      worksheet[address].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
        fill: { fgColor: { rgb: "FFFF00" } },
      };
    }

    const dateStr = new Date().toLocaleDateString().replace(/\//g, "-");
    XLSX.writeFile(workbook, `transactions-${dateStr}.xlsx`);
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center border rounded-none flex-wrap overflow-y-hidden overflow-x-auto'>
        <input
          type='month'
          className='form-control rounded-none flex-1 p-3'
          value={
            selectedMonth.length === 6
              ? `${selectedMonth.slice(0, 5)}0${selectedMonth.slice(5)}`
              : selectedMonth
          }
          max={currentMonth()}
          onChange={(event) =>
            setSelectedMonth(
              event.target.value.length === 7
                ? event.target.value.replace("-0", "-")
                : event.target.value
            )
          }
        />
        <button
          className='btn btn-primary rounded-none flex-1 p-3'
          onClick={handleExport}
        >
          <div className='text-truncate'>Export To Excel</div>
        </button>
        <select
          className='form-select flex-1 rounded-none p-3'
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        >
          <option value=''>All Days</option>
          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {filteredTransactions.length === 0 ? (
        <p className='text-center border p-3'>
          No data available for the selected month.
        </p>
      ) : (
        <div
          className='table-responsive overflow-x-hidden overflow-y-auto'
          style={{
            maxHeight: "45em",
          }}
        >
          <table className='table table-striped table-bordered table-hover mt-0 w-full divide-y '>
            <thead className='table-dark sticky top-0 z-10'>
              <tr>
                <th className='py-2 px-2 text-start'>Title</th>
                <th className='py-2 px-2 text-start'>Amount</th>
                <th className='py-2 px-2 text-start'>Type</th>
                <th className='py-2 px-2 text-start'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td
                    className='py-2 px-2 text-start text-truncate'
                    style={{ maxWidth: "150px" }}
                  >
                    <div className='text-truncate'>{transaction.title}</div>
                  </td>
                  <td className='py-2 px-2 text-start'>{transaction.amount}</td>
                  <td className='py-2 px-2 text-start'>
                    <span
                      className={`badge ${
                        transaction.type === "spent"
                          ? "bg-danger"
                          : "bg-success"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className='py-2 px-2 text-start'>
                    <button
                      className='btn btn-danger'
                      onClick={() => {
                        onDeleteExpense(transaction._id);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  onDeleteExpense: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      monthYear: PropTypes.string.isRequired,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
      totalCredited: PropTypes.number,
      totalSpent: PropTypes.number,
      remainingAmount: PropTypes.number,
    })
  ).isRequired,
};

export default DataTable;
