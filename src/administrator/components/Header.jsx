import { Link, useNavigate } from "react-router-dom"
import jsCookie from "js-cookie"
import { getCurrentUser, logout } from "../../api/AuthApi"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUser } from "../../features/authSlice";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.auth)

    const handleLogout = async (e) => {
        e.preventDefault();

        const res = await logout()

        if (res.status === 200) {
            jsCookie.remove('accessToken')
            jsCookie.remove('refreshToken')
            toast.success(res.message)
            return navigate('/administrator/login')
        }
        else {
            toast.error(res.error)
        }
    }

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
        <>
            <nav className="navbar navbar-expand-sm bg-light" style={{ "boxShadow": "0 0 10px 0 rgba(0, 0, 0, 0.4)", "position": "fixed", "width": "calc(100% - 280px)", "height": "63px", "zIndex": '9' }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mt-1">

                        </ul>
                        <ul className="navbar-nav mr-auto mt-1">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/administrator" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg" alt="" height={30} style={{ "borderRadius": "20px" }} /> <span className="ml-3">{selector.user?.name}</span>
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><Link className="dropdown-item" to="/administrator/change-password">Change Password</Link></li>
                                    <li><Link className="dropdown-item" to="/administrator/logout" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header