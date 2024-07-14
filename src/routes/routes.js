import ExpenseTraker from "../Pages/ExpenseTraker";
import Login from "../Authentication/Login";
import Home from "../Pages/Home";
import Signup from "../Authentication/Signup";

export default function routes() {
  const routes = [
    {
      id: 1,
      path: "/reactapphost/",
      Component: Home,
      name: "Home",
      isProtected: true,
      isHeader: true,
      isNav: true,
    },
    {
      id: 2,
      path: "/reactapphost/expense",
      Component: ExpenseTraker,
      name: "Expense Traker",
      isProtected: true,
      isHeader: true,
      isNav: true,
    },
    {
      id: 3,
      path: "/reactapphost/login",
      Component: Login,
      name: "Login",
      isProtected: false,
      isHeader: false,
      isNav: false,
    },
    {
      id: 4,
      path: "/reactapphost/signup",
      Component: Signup,
      name: "Signup",
      isProtected: false,
      isHeader: false,
      isNav: false,
    },
  ];
  return routes;
}
