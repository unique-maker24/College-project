import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Logout from "./Logout";
import Header from "./Header";
import Error from "./Error";
import Login from "./Login";
import AuthProvider, { useAuth } from "./security/AuthContext";

import "./Unsoldly.css";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import Welcome from "./Welcome";
import Company from "./admin/Company";
import ListCompanies from "./admin/ListCompanies";
import AdminHeader from "./admin/AdminHeader";
import { useState } from "react";
import Registration from "./Registration";
import ListUsers from "./admin/ListUsers";
import User from "./admin/User";
import ListProductCategories from "./admin/ListProductCategories";
import ProdcutCategory from "./admin/ProdcutCategory";
import ListProducts from "./admin/ListProducts";
import Product from "./admin/Product";
import ProdcutForSell from "./ProdcutForSell";
import ListProductForSale from "./ListProductForSale";
import SearchMap from "./SearchMap";
import OrderRequestForm from "./OrderRequestForm";

// Import new Material-UI components
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import ModernLogin from "./auth/ModernLogin";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/" />;
}

function AdminAuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/Admin" />;
}

export default function Unsoldly() {
  return (
    <div className="Unsoldly">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ModernLogin isAdmin={false} />} />
            <Route path="/login" element={<ModernLogin isAdmin={false} />} />
            <Route
              path="/register"
              element={
                <>
                  <Header /> <Registration />{" "}
                </>
              }
            />
            <Route path="/Admin" element={<ModernLogin isAdmin={true} />} />
            <Route
              path="/Admin/home"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Dashboard Overview">
                    <DashboardHome />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/companies"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Manage Companies">
                    <ListCompanies />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/company/:id"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Company Details">
                    <Company />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/categories"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Product Categories">
                    <ListProductCategories />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/category/:id"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Category Details">
                    <ProdcutCategory />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/products"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Manage Products">
                    <ListProducts />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/product/:id"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Product Details">
                    <Product />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/users"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="Manage Users">
                    <ListUsers />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />
            <Route
              path="/Admin/user/:id"
              element={
                <AdminAuthenticatedRoute>
                  <DashboardLayout title="User Details">
                    <User />
                  </DashboardLayout>
                </AdminAuthenticatedRoute>
              }
            />

            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Header /> <Welcome />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/product-for-sale/:id"
              element={
                <AuthenticatedRoute>
                  <Header /> <ProdcutForSell />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/products-for-sale"
              element={
                <AuthenticatedRoute>
                  <DashboardLayout title="Products for Sale">
                    <ListProductForSale />
                  </DashboardLayout>
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/search"
              element={
                <AuthenticatedRoute>
                  <DashboardLayout title="Search Products">
                    <SearchMap />
                  </DashboardLayout>
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={<AuthenticatedRoute></AuthenticatedRoute>}
            />

            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Header /> <Logout />
                </AuthenticatedRoute>
              }
            />

            <Route path="/order-request" element={<OrderRequestForm />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
