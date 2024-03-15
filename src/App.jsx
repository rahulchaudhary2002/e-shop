import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdministratorLayout from './administrator/components/Layout'
import Dashboard from './administrator/pages/Dashboard'
import Category from './administrator/pages/category/Category'
import CreateCategory from './administrator/pages/category/CreateCategory'
import Login from './administrator/pages/auth/Login'
import Register from './administrator/pages/auth/Register'
import ForgotPassword from './administrator/pages/auth/ForgotPassword'
import ResetPassword from './administrator/pages/auth/ResetPassword'
import Layout from './components/Layout'
import Home from './pages/Home'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                    </Route>
                    
                    <Route path='/administrator/*'>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="" element={<AdministratorLayout />}>
                            <Route path="" element={<Dashboard />} />
                            <Route path='category/*'>
                                <Route path="" element={<Category />} />
                                <Route path="create" element={<CreateCategory />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
