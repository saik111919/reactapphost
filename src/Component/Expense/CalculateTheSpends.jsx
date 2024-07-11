import { Delete } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";

const CalculateTheSpends = ({ expenses, onDeleteExpense }) => {
  if (!Array.isArray(expenses)) {
    console.error("Invalid prop 'expenses'. Expected an array.");
    return null;
  }

  if (typeof onDeleteExpense !== "function") {
    console.error("Invalid prop 'onDeleteExpense'. Expected a function.");
    return null;
  }

  if (expenses.length === 0) {
    return <Typography variant='h6'>No expenses available</Typography>;
  }

  const expenseData = expenses[0];

  const groupTransactionsByDate = () => {
    const groupedTransactions = {};
    expenseData.transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      if (!groupedTransactions[date]) {
        groupedTransactions[date] = [];
      }
      groupedTransactions[date].push(transaction);
    });
    return groupedTransactions;
  };

  const groupedTransactions = groupTransactionsByDate();
  const dateOptions = Object.keys(groupedTransactions);

  const [selectedDate, setSelectedDate] = useState(dateOptions[0] || "");

  useEffect(() => {
    if (dateOptions.length > 0) {
      setSelectedDate(dateOptions[dateOptions.length - 1]);
    }
  }, [dateOptions]);

  useEffect(() => {
    if (dateOptions.length > 0 && !dateOptions.includes(selectedDate)) {
      setSelectedDate(dateOptions[0]);
    }
  }, [dateOptions, selectedDate]);

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant='h5' component='div' gutterBottom>
        Expense Details
      </Typography>

      <div className='d-flex justify-content-between mb-2 flex-wrap gap-3'>
        <Paper style={{ padding: "20px", flex: 1 }}>
          <Typography variant='h6'>Total Spent</Typography>
          <Typography variant='body1'>
            ₹{expenseData.totalSpent.toFixed(2)}
          </Typography>
        </Paper>
        <Paper style={{ padding: "20px", flex: 1 }}>
          <Typography variant='h6'>Total Credited</Typography>
          <Typography variant='body1'>
            ₹{expenseData.totalCredited.toFixed(2)}
          </Typography>
        </Paper>
        <Paper style={{ padding: "20px", flex: 1 }}>
          <Typography variant='h6'>Remaining Amount</Typography>
          <Typography variant='body1'>
            ₹{expenseData.remainingAmount.toFixed(2)}
          </Typography>
        </Paper>
      </div>

      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel>Date</InputLabel>
          <Select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            label='Date'
          >
            {dateOptions.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedDate && (
        <div>
          <Paper elevation={3} className='p-2 pb-1 mb-1'>
            <Typography variant='h6' gutterBottom>
              {selectedDate}
            </Typography>
          </Paper>
          <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align='right'>Amount</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedTransactions[selectedDate].map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell component='th' scope='row'>
                      {transaction.title}
                    </TableCell>
                    <TableCell align='right'>
                      ₹{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell align='right'>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => onDeleteExpense(transaction._id)}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Paper>
  );
};

CalculateTheSpends.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      monthYear: PropTypes.string.isRequired,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          title: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
          type: PropTypes.oneOf(["spent", "credited"]).isRequired,
          user: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        })
      ).isRequired,
      totalCredited: PropTypes.number.isRequired,
      totalSpent: PropTypes.number.isRequired,
      remainingAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default CalculateTheSpends;

// import { Delete } from "@mui/icons-material";
// import PropTypes from "prop-types";
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useState, useEffect } from "react";

// const CalculateTheSpends = ({ expenses, onDeleteExpense }) => {
//   // Validate props
//   if (!Array.isArray(expenses) || typeof onDeleteExpense !== "function") {
//     console.error("Invalid props");
//     return null;
//   }

//   // State variables for selected month, day, and grouped expenses
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedDay, setSelectedDay] = useState("");
//   const [groupedExpenses, setGroupedExpenses] = useState({});

//   // Function to group expenses by month and day
//   const groupByMonthAndDay = (expenses) =>
//     expenses.reduce((acc, expense) => {
//       const date = new Date(expense.createdAt);
//       const month = `${date.getFullYear()}-${String(
//         date.getMonth() + 1
//       ).padStart(2, "0")}`;
//       const day = `${date.getDate()}`.padStart(2, "0");
//       acc[month] = acc[month] || { days: {}, spent: 0, credited: 0 };
//       acc[month].days[day] = acc[month].days[day] || [];
//       acc[month].days[day].push(expense);
//       acc[month][expense.type] += expense.amount;
//       return acc;
//     }, {});

//   // Calculate totals for the selected month and day
//   const monthTotals = selectedMonth
//     ? groupedExpenses[selectedMonth]
//     : { spent: 0, credited: 0 };
//   const currentExpenses =
//     groupedExpenses[selectedMonth]?.days[selectedDay] || [];
//   const remaining = monthTotals.credited - monthTotals.spent;

//   // Handle change in selected month
//   const handleMonthChange = (e) => {
//     const selectedMonthValue = e.target.value;
//     setSelectedMonth(selectedMonthValue);
//     setSelectedDay(Object.keys(groupedExpenses[selectedMonthValue].days)[0]);
//   };

//   // Handle change in selected day
//   const handleDayChange = (e) => {
//     setSelectedDay(e.target.value);
//   };

//   // Effect to update grouped expenses when expenses change
//   useEffect(() => {
//     const grouped = groupByMonthAndDay(expenses);
//     setGroupedExpenses(grouped);

//     // Select last month and first day when expenses change
//     const months = Object.keys(grouped);
//     if (months.length > 0) {
//       setSelectedMonth(months[months.length - 1]);
//       setSelectedDay(Object.keys(grouped[months[months.length - 1]].days)[0]);
//     }
//   }, [expenses]);

//   return (
//     <Paper elevation={3} sx={{ p: 2 }}>
//       <Typography variant='h5' gutterBottom>
//         Expense Details
//       </Typography>

//       {/* Total Spent, Total Credited, Remaining Amount */}
//       <Box
//         display='flex'
//         justifyContent='space-between'
//         mb={2}
//         gap={3}
//         flexWrap='wrap'
//       >
//         {["Total Spent", "Total Credited", "Remaining Amount"].map(
//           (label, idx) => (
//             <Paper key={label} sx={{ p: 2, flex: 1 }}>
//               <Typography variant='h6'>{label}</Typography>
//               <Typography variant='body1'>
//                 ₹
//                 {[monthTotals.spent, monthTotals.credited, remaining][
//                   idx
//                 ].toFixed(2)}
//               </Typography>
//             </Paper>
//           )
//         )}
//       </Box>

//       {/* Month and Day Selectors */}
//       <div className='d-flex flex-wrap gap-2'>
//         <Box mb={3} flex={1}>
//           <FormControl fullWidth size='small'>
//             <InputLabel>Month</InputLabel>
//             <Select
//               value={selectedMonth}
//               onChange={handleMonthChange}
//               label='Month'
//             >
//               {Object.keys(groupedExpenses).map((month) => (
//                 <MenuItem key={month} value={month}>
//                   {month}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         {selectedMonth && groupedExpenses[selectedMonth] && (
//           <Box mb={3} flex={1}>
//             <FormControl fullWidth size='small'>
//               <InputLabel>Day</InputLabel>
//               <Select
//                 value={selectedDay}
//                 onChange={handleDayChange}
//                 label='Day'
//               >
//                 {Object.keys(groupedExpenses[selectedMonth].days).map((day) => (
//                   <MenuItem key={day} value={day}>
//                     {day}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         )}
//       </div>

//       {/* Display expenses for selected day */}
//       {selectedMonth && selectedDay && currentExpenses.length > 0 && (
//         <>
//           <Paper elevation={3} sx={{ p: 1, mb: 1 }}>
//             <Typography variant='h6'>
//               {`${selectedMonth}-${selectedDay}`}
//             </Typography>
//           </Paper>
//           <TableContainer component={Paper} sx={{ mb: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Title</TableCell>
//                   <TableCell align='right'>Amount</TableCell>
//                   <TableCell align='right'>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentExpenses.map(({ _id, title, amount }) => (
//                   <TableRow key={_id}>
//                     <TableCell>{title}</TableCell>
//                     <TableCell align='right'>₹{amount.toFixed(2)}</TableCell>
//                     <TableCell align='right'>
//                       <Button
//                         variant='contained'
//                         color='error'
//                         onClick={() => onDeleteExpense(_id)}
//                       >
//                         <Delete />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </>
//       )}
//     </Paper>
//   );
// };

// // PropTypes for CalculateTheSpends component
// CalculateTheSpends.propTypes = {
//   expenses: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       title: PropTypes.string.isRequired,
//       amount: PropTypes.number.isRequired,
//       type: PropTypes.oneOf(["spent", "credited"]).isRequired,
//       createdAt: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onDeleteExpense: PropTypes.func.isRequired,
// };

// export default CalculateTheSpends;
