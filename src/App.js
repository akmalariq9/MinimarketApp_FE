import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Routes.js";
import WorkerDashboardPage from "./pages/Worker/WorkerDashboardPage.jsx";
import ManagerDashboardPage from "./pages/Manager/ManagerDashboardPage.jsx";
import WorkerProtectedRoute from "./Routes/WorkerProtectedRoute.js";
import ManagerProtectedRoute from "./Routes/ManagerProtectedRoute.js";
import HomeProtectedRoute from "./Routes/HomeProtectedRoute.js";
import WorkerPurchaseHistoryPage from "./pages/Worker/WorkerPurchaseHistoryPage.jsx";
import ManagerAllEmployeePage from "./pages/Manager/ManagerAllEmployeePage.jsx";
import ManagerAllProductPage from "./pages/Manager/ManagerAllProductPage.jsx";
import ManagerAllPurchasePage from "./pages/Manager/ManagerAllPurchasePage.jsx";
import ManagerAllSalesPage from "./pages/Manager/ManagerAllSalesPage.jsx";
import WorkerSalesHistoryPage from "./pages/Worker/WorkerSalesHistoryPage.jsx";
import ManagerAllMemberPage from "./pages/Manager/ManagerAllMemberPage.jsx";
import ManagerDetailSalesPage from "./pages/Manager/ManagerDetailSalesPage.jsx";
import ManagerDetailsPurchasePage from "./pages/Manager/ManagerDetailPurchasePage.jsx";
import WorkerAddSalesTransaction from "./components/Worker/WorkerAddSalesTransaction.jsx";
import WorkerAddPurchaseTransaction from "./components/Worker/WorkerAddPurchaseTransaction.jsx";
import WorkerAddSalesProduct from "./components/Worker/WorkerAddSalesProduct.jsx";
import WorkerAddPurchaseProduct from "./components/Worker/WorkerAddPurchaseProduct.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <HomeProtectedRoute>
              <WorkerDashboardPage />
            </HomeProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <WorkerProtectedRoute>
              <WorkerDashboardPage />
            </WorkerProtectedRoute>
          }
        />
        <Route
          path="/sales-history"
          element={
            <WorkerProtectedRoute>
              <WorkerSalesHistoryPage />
            </WorkerProtectedRoute>
          }
        />
        <Route
          path="/purchase-history"
          element={
            <WorkerProtectedRoute>
              <WorkerPurchaseHistoryPage />
            </WorkerProtectedRoute>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <ManagerProtectedRoute>
              <ManagerDashboardPage />
            </ManagerProtectedRoute>
          }
        />

        <Route
          path="/manager-all-purchase"
          element={
            <ManagerProtectedRoute>
              <ManagerAllPurchasePage />
            </ManagerProtectedRoute>
          }
        />
        <Route
          path="/manager-all-sales"
          element={
            <ManagerProtectedRoute>
              <ManagerAllSalesPage />
            </ManagerProtectedRoute>
          }
        />

        <Route
          path="/manager-all-products"
          element={
            <ManagerProtectedRoute>
              <ManagerAllProductPage />
            </ManagerProtectedRoute>
          }
        />
        <Route
          path="/manager-all-employee"
          element={
            <ManagerProtectedRoute>
              <ManagerAllEmployeePage />
            </ManagerProtectedRoute>
          }
        />

        <Route
          path="/manager-all-member"
          element={
            <ManagerProtectedRoute>
              <ManagerAllMemberPage />
            </ManagerProtectedRoute>
          }
        />

        <Route
          path="/barang-transaksi-penjualan/:id"
          element={
            // <ManagerProtectedRoute>
            <ManagerDetailSalesPage />
            // </ManagerProtectedRoute>
          }
        />

        <Route
          path="/barang-transaksi-pembelian/:id"
          element={
            // <ManagerProtectedRoute>
            <ManagerDetailsPurchasePage />
            // </ManagerProtectedRoute>
          }
        />

        <Route
          path="/create-sales-transaction/"
          element={
            // <WorkerProtectedRoute>
              <WorkerAddSalesTransaction />
            // </WorkerProtectedRoute>
          }
        />

        <Route
          path="/create-purchase-transaction/"
          element={
            // <WorkerProtectedRoute>
              <WorkerAddPurchaseTransaction />
            // </WorkerProtectedRoute>
          }
        />

        <Route
          path="/add-sales-product/:id"
          element={
            // <WorkerProtectedRoute>
            <WorkerAddSalesProduct />
            // </WorkerProtectedRoute>
          }
        />

        <Route
          path="/add-purchase-product/:id"
          element={
            // <WorkerProtectedRoute>
            <WorkerAddPurchaseProduct />
            // </WorkerProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
