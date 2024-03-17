import React, { useEffect, useState } from 'react'
import Loading from '../../../common/components/Loading';
import jsCookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
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
                                        <input className='form-control' type="text" name='name' id='name' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <select className='form-control' name="category" id="category">
                                            <option value="">Select Category</option>
                                        </select>
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