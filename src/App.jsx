import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BackendLayout from './Backend/Components/Layout'
import Dashboard from './Backend/Pages/Dashboard'
import Category from './Backend/Pages/Category/Category'
import CreateCategory from './Backend/Pages/Category/CreateCategory'
import Login from './Backend/Pages/Auth/Login'
import Register from './Backend/Pages/Auth/Register'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/administrator/login" element={<Login />} exact />
                    <Route path="/administrator/register" element={<Register />} exact />
                    <Route path="/administrator" element={<BackendLayout />}>
                        <Route path="/administrator" element={<Dashboard />} exact />
                        <Route path="/administrator/category" element={<Category />} exact />
                        <Route path="/administrator/category/create" element={<CreateCategory />} exact />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
