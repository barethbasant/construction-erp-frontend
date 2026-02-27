import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/LoginPage';
import Dashboard from '../features/dashboard/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import CategoryPage from '../features/masters/category/CategoryPage';
import UnitPage from '../features/masters/unit/UnitPage';
import MaterialPage from '../features/masters/material/MaterialPage';
import VendorPage from '../features/masters/vendor/VendorPage';
import PurchaseOrderPage from '../features/purchase/purchase-order/PurchaseOrderPage';
import SitePage from '../features/masters/site/SitePage';
import PurchaseRequestPage from '../features/purchase/purchase-request/PurchaseRequestPage';


const AppRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage />} >

            </Route>
            <Route path='/' element={<DashboardLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path="categories" element={<CategoryPage />} />
                <Route path="unit" element={<UnitPage />} />
                <Route path="material" element={<MaterialPage />} />
                <Route path="vendor" element={<VendorPage />} />
                <Route path="site" element={<SitePage />} />
                 <Route path="purchase-request" element={<PurchaseRequestPage />} />
                <Route path="purchase-order" element={<PurchaseOrderPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRoutes;