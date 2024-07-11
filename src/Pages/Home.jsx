import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={"/reactapphost/expense"} className='btn btn-outline-primary'>
        ExpenseTraker
      </Link>
    </div>
  );
};

export default Home;
