import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdministratorLayout from './administrator/components/Layout';
import Dashboard from './administrator/pages/Dashboard';
import Category from './administrator/pages/category/Category';
import CreateCategory from './administrator/pages/category/CreateCategory';
import Login from './administrator/pages/auth/Login';
import Register from './administrator/pages/auth/Register';
import ForgetPassword from './administrator/pages/auth/ForgetPassword';
import Layout from './website/components/Layout';
import Home from './website/pages/Home';
import Verify from './administrator/pages/auth/Verify';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './administrator/pages/auth/ResetPassword';
import ChangePassword from './administrator/pages/auth/ChangePassword';

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path='' element={<Layout />}>
                    <Route path='/' element={<Home />} />
                </Route>

                <Route path='/administrator/*'>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verify/:token" element={<Verify />} />
                    <Route path="forget-password" element={<ForgetPassword />} />
                    <Route path="reset-password/:token" element={<ResetPassword />} />
                    <Route path="" element={<AdministratorLayout />} >
                        <Route path="change-password" element={<ChangePassword />} />
                        <Route path="" element={<Dashboard />} />
                        <Route path='category/*'>
                            <Route path="" element={<Category />} />
                            <Route path="create" element={<CreateCategory />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
