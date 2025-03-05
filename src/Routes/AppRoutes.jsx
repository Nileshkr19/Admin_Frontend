import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import LoginPage from '../login/LoginPage.jsx';
import AdminLayout from '../components/AdminLayout.jsx';
import Dashboard from '../Pages/Dashboard.jsx';
import UsersManagement from '../Pages/UsersManagement.jsx';
import ProductManagement from '../Pages/ProductManagement.jsx';
import OrderManagement from '../Pages/OrderManagement.jsx';
import Settings from '../Pages/Settings';
import Analytics from '../Pages/Analytics';
import Notification from "../Pages/Notification.jsx";
import AdminProfile from '../Pages/AdminProfile.jsx';

function AppRoutes() {
    return (

            <Routes>
                {/* Public Route: Login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoutes />}>
                    <Route element={<AdminLayout />}>
                        {/* Default Route: Redirect to /admin/dashboard */}
                        <Route index element={<Navigate to="/admin/dashboard" />} />

                        {/* Admin Pages */}
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="users" element={<UsersManagement />} />
                        <Route path="Product-management" element={<ProductManagement />} />
                        <Route path="order-management" element={<OrderManagement />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="notifications" element={<Notification />} />
                        <Route path="admin" element={<AdminProfile />} />
                    </Route>
                </Route>

                {/* Catch-All (404) Route: Redirect unknown URLs to /login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    );
}

export default AppRoutes;
