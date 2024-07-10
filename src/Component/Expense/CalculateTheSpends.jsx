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
  // Function to group expenses by date using id
  const groupExpensesByDate = () => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.createdAt).toLocaleDateString();
      if (!groupedExpenses[date]) {
        groupedExpenses[date] = [];
      }
      groupedExpenses[date].push(expense);
    });
    return groupedExpenses;
  };
  const groupedExpenses = groupExpensesByDate();
  const dateOptions = Object.keys(groupedExpenses);

  const [selectedDate, setSelectedDate] = useState(dateOptions[0] || "");

  useEffect(() => {
    if (dateOptions.length > 0) {
      setSelectedDate(dateOptions[dateOptions.length - 1]);
    }
  }, [dateOptions]);
  if (!Array.isArray(expenses)) {
    console.error("Invalid prop 'expenses'. Expected an array.");
    return null;
  }

  if (typeof onDeleteExpense !== "function") {
    console.error("Invalid prop 'onDeleteExpense'. Expected a function.");
    return null;
  }

  // Function to calculate totals based on type
  const calculateTotalsByType = (type) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.type === type
    );
    const totalAmount = filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return totalAmount;
  };

  const totalsByType = {
    spent: calculateTotalsByType("spent"),
    credited: calculateTotalsByType("credited"),
  };

  // Calculate remaining amount
  const remainingAmount = totalsByType.credited - totalsByType.spent;

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant='h5' component='div' gutterBottom>
        Expense Details
      </Typography>

      <div className='d-flex justify-content-between mb-2 flex-wrap gap-3'>
        <Paper style={{ padding: "20px", flex: 1 }}>
          <Typography variant='h6'>Total Spent</Typography>
          <Typography variant='body1'>
            ₹{totalsByType.spent.toFixed(2)}
          </Typography>
        </Paper>
        <Paper style={{ padding: "20px", flex: 1 }}>
          <Typography variant='h6'>Total Credited</Typography>
          <Typography variant='body1'>
            ₹{totalsByType.credited.toFixed(2)}
          </Typography>
        </Paper>
        <Paper style={{ padding: "20px", flex: 1 }}>
          <Typography variant='h6'>Remaining Amount</Typography>
          <Typography variant='body1'>₹{remainingAmount.toFixed(2)}</Typography>
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
                {groupedExpenses[selectedDate].map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell component='th' scope='row'>
                      {expense.title}
                    </TableCell>
                    <TableCell align='right'>
                      ₹{expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell align='right'>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => onDeleteExpense(expense._id)}
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
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["spent", "credited"]).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default CalculateTheSpends;
