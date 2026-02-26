import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/LoginPage';
import Dashboard from '../features/dashboard/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import CategoryPage from '../features/masters/category/CategoryPage';

const AppRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage />} >

            </Route>
            <Route path='/' element={<DashboardLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path="categories" element={<CategoryPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRoutes;