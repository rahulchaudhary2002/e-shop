import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../../common/components/Loading';
import jsCookie from 'js-cookie';

const Category = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

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
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className='card-title mt-2'>Category</h5>
                        <Link to="/administrator/category/create" className='btn btn-md btn-primary'><i className="fa fa-plus"></i> create category</Link>
                    </div>
                    <div className="card-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Electronic</td>
                                    <td><Link className="btn btn-sm btn-primary"><i className="fa fa-edit"></i></Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
}

export default Category