import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdministratorLayout from './administrator/components/Layout';
import Dashboard from './administrator/pages/Dashboard';
import Category from './administrator/pages/category/Category';
import Login from './administrator/pages/auth/Login';
import Register from './administrator/pages/auth/Register';
import ForgetPassword from './administrator/pages/auth/ForgetPassword';
import Layout from './website/components/Layout';
import Home from './website/pages/Home';
import Verify from './administrator/pages/auth/Verify';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './administrator/pages/auth/ResetPassword';
import ChangePassword from './administrator/pages/auth/ChangePassword';
import { setCurrentUser } from "./features/authSlice";
import { useDispatch } from 'react-redux';
import jsCookie from "js-cookie"
import { getCurrentUser } from './api/AuthApi';
import CategoryLayout from './administrator/pages/category/CategoryLayout';
import UserLayout from './administrator/pages/user/UserLayout';
import User from './administrator/pages/user/User';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        if (jsCookie.get('accessToken'))
            getCurrentUser()
                .then(res => {
                    if (res.status === 200) {
                        dispatch(setCurrentUser(res.data.user))
                    }
                })
    }, [])

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
                        <Route path="" element={<Dashboard />} />
                        <Route path="change-password" element={<ChangePassword />} />
                        <Route path="category" element={<CategoryLayout />} >
                            <Route path="" element={<Category />} />
                        </Route>
                        <Route path="user" element={<UserLayout />} >
                            <Route path="" element={<User />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
