import React from 'react'
import '../assets/css/header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="header-top">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div></div>
                        <div className="header-top-quick-link">
                            <Link to="./login.html" title="Login" className='text-dark text-decoration-none'>Login</Link>
                            <Link to="./register.html" title="Register" className='text-dark text-decoration-none'>Register</Link>
                        </div>
                    </div>
                </div>
                <div className="header-main">
                    <div className="container d-flex justify-content-between align-items-center gap-3">
                        <div className="header-main-logo">
                            <Link to="#" title="Logo" className='text-dark text-decoration-none'><img src="/logo.png" alt="Logo" /></Link>
                        </div>
                        <form className='d-flex justify-content-between align-items-center' action="#">
                            <input type="text" placeholder="What do you need?" />
                            <button className="btn btn-primary" type="submit"><div className="fa fa-search"></div></button>
                        </form>
                        <Link to="#" title="Shopping Cart" className="text-dark text-decoration-none header-main-cart position-relative"><i className="fa fa-shopping-bag"></i> <span className="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle"></span></Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header