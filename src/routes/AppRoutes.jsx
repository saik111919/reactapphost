import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Layout from "../layout/Layout";
import Protect from "../plugin/Protect";

const AppRoutes = () => {
  // Split routes based on isHeader
  const headerRoutes = routes.filter((route) => route.isHeader);
  const otherRoutes = routes.filter((route) => !route.isHeader);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/reactapphost/' element={<Layout />}>
          {headerRoutes.map(({ path, Component, name, isProtected }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <Protect
                  Component={Component}
                  name={name}
                  isProtected={isProtected}
                />
              }
            />
          ))}
        </Route>
        {otherRoutes.map(({ path, Component, name, isProtected }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <Protect
                Component={Component}
                name={name}
                isProtected={isProtected}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
