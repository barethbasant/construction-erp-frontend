import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/LoginPage';
import Dashboard from '../features/dashboard/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';

const AppRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage />} >

            </Route>
            <Route path='/' element={<DashboardLayout />}>
                <Route path='dashboard' element={<Dashboard />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRoutes;