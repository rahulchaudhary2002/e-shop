import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({ email: '' });
    const [error, setError] = useState({ email: '' });
    const host = import.meta.env.VITE_REACT_APP_API_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.email === '') {
            setError({ email: "Email is required." });
        }
        else {
            const response = await fetch(`${host}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: state.email })
            });

            const json = await response.json();

            if (json.token) {
                localStorage.setItem('token', json.token);
                props.setMessage("Password reset link sent successfully.");

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
                <div className="col-md-8 offset-md-2 col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="card-title text-white text-center mt-2">Forgot Password</h4>
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
                                        <button className="w-100 btn btn-md btn-primary">Send Reset Link</button>
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