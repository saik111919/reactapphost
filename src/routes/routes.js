import ExpenseTraker from "../Pages/ExpenseTraker";
import Login from "../Authentication/Login";
import Home from "../Pages/Home";

export default function routes() {
  const routes = [
    {
      id: 1,
      path: "/",
      Component: Home,
      name: "Home",
      isProtected: true,
      isHeader: true,
      isNav: true,
    },
    {
      id: 2,
      path: "/expense",
      Component: ExpenseTraker,
      name: "Expense Traker",
      isProtected: true,
      isHeader: true,
      isNav: true,
    },
    {
      id: 2,
      path: "/login",
      Component: Login,
      name: "Login",
      isProtected: false,
      isHeader: false,
      isNav: false,
    },
  ];
  return routes;
}
