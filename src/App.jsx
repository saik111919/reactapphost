import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Layout/Navbar";
import routes from "./routes/routes";
import Protect from "./Authentication/Protect";
import NoPage from "./Utils/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/reactapphost' element={<Navbar />}>
          {routes().map(
            (route) =>
              route.isNav && (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    <Protect Component={route.Component} name={route.name} />
                  }
                />
              )
          )}
        </Route>
        <Route path='*' element={<NoPage />} />
        {routes().map(
          (route) =>
            !route.isNav && (
              <Route
                key={route.id}
                path={route.path}
                element={<route.Component />}
              />
            )
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
