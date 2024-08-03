import { lazy } from "react";
import Login from "../pages/Auth/Login.jsx";
import Signup from "../pages/Auth/Signup.jsx";
const Home = lazy(() => import("../pages/Home/Home"));
const ExpenseTraker = lazy(() => import("../pages/Expense/ExpenseTraker"));
const Settings = lazy(() => import("../pages/settings/Settings"));

const routes = [
  {
    path: "/reactapphost/",
    Component: Home,
    name: "Home",
    isProtected: true,
    isHeader: true,
  },
  {
    path: "/reactapphost/expense",
    Component: ExpenseTraker,
    name: "Expense Traker",
    isProtected: true,
    isHeader: true,
  },
  {
    path: "/reactapphost/login",
    Component: Login,
    name: "Login",
    isProtected: false,
    isHeader: false,
  },
  {
    path: "/reactapphost/signup",
    Component: Signup,
    name: "Signup",
    isProtected: false,
    isHeader: false,
  },
  {
    path: "/reactapphost/settings",
    Component: Settings,
    name: "Settings",
    isProtected: true,
    isHeader: true,
  },
];

export default routes;
