import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { AddTransactions } from "../../Api/Service";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpenseForm = ({ onAddExpense, getData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const tags = [
    { value: "spent", label: "Amount Spent" },
    { value: "credited", label: "Amount Credited" },
  ];

  const onSubmit = (data) => {
    onAddExpense({ ...data, id: Date.now() });
    reset();
    AddTransactions(data)
      .then((data) => {
        console.log(data);
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Paper elevation={12} sx={{ mt: 3, mb: 1, p: 2 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography variant='h6'>Add Expenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label='Title'
                  variant='outlined'
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ""}
                  {...register("title", { required: "Title is required" })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label='Amount'
                  type='number'
                  variant='outlined'
                  fullWidth
                  error={!!errors.amount}
                  helperText={errors.amount ? errors.amount.message : ""}
                  {...register("amount", {
                    required: "Amount is required",
                    valueAsNumber: true,
                    validate: (value) =>
                      value > 0 || "Amount must be greater than 0",
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label='Type'
                  variant='outlined'
                  fullWidth
                  error={!!errors.type}
                  helperText={errors.type ? errors.type.message : ""}
                  {...register("type", { required: "Type is required" })}
                >
                  <MenuItem value=''>
                    <em>Select type...</em>
                  </MenuItem>
                  {tags.map((tag) => (
                    <MenuItem key={tag.value} value={tag.value}>
                      {tag.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Add Expense
                </Button>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default ExpenseForm;
