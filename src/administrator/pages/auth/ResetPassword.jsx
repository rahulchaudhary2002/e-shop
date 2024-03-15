import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({ email: '', password: '', confirm_password: '' });
    const [error, setError] = useState({ email: '', password: '', confirm_password: '' });
    const host = import.meta.env.VITE_REACT_APP_API_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.name === '' || state.email === '' || state.password === '') {
            let newErrors = { ...error };

            if (state.email === '') {
                newErrors = { ...newErrors, email: "Email is required." };
            }
            else {
                newErrors = { ...newErrors, email: "" };
            }

            if (state.password === '') {
                newErrors = { ...newErrors, password: "Password is required." };
            }
            else {
                newErrors = { ...newErrors, password: "" };
            }

            if (state.confirm_password === '') {
                newErrors = { ...newErrors, confirm_password: "Confirm Password is required." };
            } else if (state.confirm_password !== state.password) {
                newErrors = { ...newErrors, confirm_password: "Password did not match." };
            }
            else {
                newErrors = { ...newErrors, confirm_password: "" };
            }

            setError(newErrors);
        }
        else {
            const response = await fetch(`${host}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: state.email, password: state.password, confirm_password: state.confirm_password })
            });

            const json = await response.json();

            if (json.token) {
                localStorage.setItem('token', json.token);
                props.setMessage("Registered successfully.");

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
                            <h4 className="card-title text-white text-center mt-2">Reset Password</h4>
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
                                        <div className="form-group">
                                            <label htmlFor="confirm_password">Confirm Password</label>
                                            <input className="form-control" type="password" name="confirm_password" onChange={handleChange} value={state.confirm_password} />
                                            <span className="text-danger">{error.confirm_password}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="w-100 btn btn-primary">Reset Password</button>
                                    </div>
                                    <span className="text-center">Already have an account? <Link className="text-center text-decoration-none" to={'/administrator/login'}>Login</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}