import { Home } from "@mui/icons-material";

export default function routes() {
  const routes = [
    {
      path: "/",
      Component: Home,
      name: "Home",
      isProtected: true,
      isHeader: true,
    },
  ];
  return routes;
}
