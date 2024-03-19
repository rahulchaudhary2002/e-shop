import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    let location = useLocation();

    return (
        <div className="d-flex flex-column flex-shrink-0 py-3 text-bg-dark" style={{ "width": "280px", "height": "100vh", "position": "fixed" }}>
            <Link to="/administrator" className="d-flex px-3 align-items-center">
                <img src="/logo.png" alt="Logo" height={30} />
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link to="/administrator" className={`nav-link text-white d-flex align-items-center gap-3 ${location.pathname==="/administrator" ? "active" : ""}`}>
                        <i className="fa fa-dashboard"></i> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/administrator/category" className={`nav-link text-white d-flex align-items-center gap-3 ${location.pathname==="/administrator/category" ? "active" : ""}`}>
                        <i className="fa fa-list-alt"></i> Category
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar