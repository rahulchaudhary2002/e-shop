import React, { useEffect, useState } from 'react'
import Loading from '../../../common/components/Loading';
import jsCookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../../api/CategoryApi';
import { toast } from 'react-toastify';

const CreateCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({ name: '', file: '' })
    const [errors, setErrors] = useState({ name: '', file: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const res = await createCategory(state, setErrors)

        if (res.status === 200) {
            toast.success(res.message)
            return navigate('/administrator/category')
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setLoading(false)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.files[0] });
    }

    useEffect(() => {
        if (!jsCookie.get('accessToken')) {
            navigate('/administrator/login')
        }
        setLoading(false);
    }, [])

    if (loading)
        return <Loading />
    else
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title mt-2">Create Category</h5>
                    </div>
                    <div className="card-body">
                        <form action="/" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input className='form-control' type="text" name='name' id='name' value={state.name} onChange={handleChange} />
                                        <span className="text-danger">{errors.name}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="file">Image</label>
                                        <input className='form-control' type="file" name='file' id='file' onChange={handleFileChange} />
                                        <span className="text-danger">{errors.file}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className='btn btn-md btn-primary mt-2'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
}

export default CreateCategory