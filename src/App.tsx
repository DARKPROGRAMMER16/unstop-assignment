import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import { ToastContainer } from "react-toastify";

// lazy loading the components
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* Suspense is a HOC that allows us to load the component asynchronously */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                // PrivateRoute is a HOC that checks if the user is logged in allows access to several protected routes
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
};

export default App;
