import React from 'react'
import '../assets/css/header.css'

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="header-top">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div></div>
                        <div className="header-top-quick-link">
                            <a href="./login.html" title="Login">Login</a>
                            <a href="./register.html" title="Login">Register</a>
                        </div>
                    </div>
                </div>
                <div className="header-main">
                    <div className="container d-flex justify-content-between align-items-center gap-3">
                        <div className="header-main-logo">
                            <a href="#" title="Logo"><img src="/logo.png" alt="Logo" /></a>
                        </div>
                        <form className='d-flex justify-content-between align-items-center' action="#">
                            <input type="text" placeholder="What do you need?" />
                            <button className="btn btn-primary" type="submit"><div className="fa fa-search"></div></button>
                        </form>
                        <a href="#" title="Shopping Cart" className="header-main-cart position-relative"><i className="fa fa-shopping-bag"></i> <span className="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle"></span></a>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header