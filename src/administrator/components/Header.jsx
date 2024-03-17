import { Link, useNavigate } from "react-router-dom"
import jsCookie from "js-cookie"
import { logout } from "../../api/AuthApi"
import { toast } from "react-toastify"

const Header = () => {
    const navigate = useNavigate()

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
                                    <img src="https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg" alt="" height={30} style={{ "borderRadius": "20px" }} /> <span className="ml-3">Administrator</span>
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
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