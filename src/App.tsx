import { lazy, Suspense, useCallback, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import { ToastContainer } from "react-toastify";

// lazy loading the components
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));

const useClearLocalStorageOnInactivity = (timeout: number) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start a new timer
    timerRef.current = setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, timeout);
  }, [timeout]);

  useEffect(() => {
    // Reset the timer on user activity
    const handleUserActivity = () => {
      resetTimer();
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    // Start the initial timer
    resetTimer();

    return () => {
      // Cleanup event listeners and timer on unmount
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeout, resetTimer]);

  return null;
};

const useClearLocalStorageOnTabClose = () => {
  useEffect(() => {
    sessionStorage.setItem("isTabClosed", "false");

    const handleBeforeUnload = () => {
      sessionStorage.setItem("isTabClosed", "true");
    };

    const handleUnload = () => {
      const isTabClosed = sessionStorage.getItem("isTabClosed");
      if (
        isTabClosed === "true" &&
        localStorage.getItem("rememberMe") === "false"
      ) {
        localStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
};

const App = () => {
  useClearLocalStorageOnInactivity(15000);

  useClearLocalStorageOnTabClose();

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
      <ToastContainer />
    </div>
  );
};

export default App;
