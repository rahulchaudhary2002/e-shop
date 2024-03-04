import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({ email: '', password: '' });
    const [error, setError] = useState({ email: '', password: '' });
    const host = import.meta.env.VITE_REACT_APP_API_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.email === '' || state.password === '') {
            if (state.email === '') {
                setError({ ...error, email: "Email is required." });
            }
            if (state.password === '') {
                setError({ ...error, password: "Password is required" });
            }
        }
        else {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: state.email, password: state.password })
            });

            const json = await response.json();

            if (json.token) {
                localStorage.setItem('token', json.token);
                props.setMessage("Logged in successfully");

                setTimeout(() => {
                    props.setMessage('');
                }, 2000);
                navigate('/');
            }
        }
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ 'minHeight': '100vh' }}>
            <div className="row">
                <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="card-title text-white text-center mt-2">Login</h4>
                        </div>
                        <div className="card-body">
                            <form action="/" onSubmit={handleSubmit}>
                                <div className="row g-2">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input className="form-control" type="text" name="email" onChange={handleChange} value={state.email} />
                                            <span className="text-danger">{error.email}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input className="form-control" type="password" name="password" onChange={handleChange} value={state.password} />
                                            <span className="text-danger">{error.password}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <Link className='float-end text-decoration-none'>Forgot your password?</Link>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="form-control btn btn-md btn-primary">Login</button>
                                    </div>
                                    <span className="text-center">Don't have an account yet? <Link className="text-center text-decoration-none" to={'/administrator/register'}>Register now</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}