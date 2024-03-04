import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className='container'>
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