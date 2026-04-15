import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const readAuthStatus = () =>
    localStorage.getItem("isAuthenticated") === "true" ||
    Boolean(localStorage.getItem("token"));

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(readAuthStatus());

  useEffect(() => {
    const updateAuth = () => {
      setIsAuthenticated(readAuthStatus());
    };

    window.addEventListener("authChanged", updateAuth);
    return () => window.removeEventListener("authChanged", updateAuth);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Logout failed: ${data.message || "Unknown error"}`);
        return;
      }

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.dispatchEvent(new Event("authChanged"));

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="#">
        MyApp
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {isAuthenticated ? (
        <ProtectedRoute>
          <>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="/user/dashboard">
                    Budget
                  </a>
                </li>
              </ul>

              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="/user/expense">
                    Expense
                  </a>
                </li>
              </ul>

              <div className="d-flex">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        </ProtectedRoute>
      ) : (
        <>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Login
                </a>
              </li>
            </ul>

            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
