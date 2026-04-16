import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../component/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/user/Dashboard";
import ProtectedRoute from "../component/ProtectedRoute";
import Expense from "../pages/user/Expense";
import Summary from "../pages/user/Summary";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/expense"
            element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
