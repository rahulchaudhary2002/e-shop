import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-light" style={{"boxShadow": "0 0 10px 0 rgba(0, 0, 0, 0.4)", "position": "fixed", "width": "calc(100% - 280px)", "height": "60px", "zIndex": '9'}}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mt-1">

                        </ul>
                        <ul className="navbar-nav mr-auto mt-1">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/administrator" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png" alt="" height={30} style={{"borderRadius": "20px"}} /> <span className="ml-3">Administrator</span>
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><a className="dropdown-item" href="/logout">Logout</a></li>
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