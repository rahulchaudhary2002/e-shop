import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../../common/components/Loading';
import jsCookie from 'js-cookie';
import { getCategories } from '../../../api/CategoryApi';
import Pagination from '../../../common/components/Pagination';

const Category = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [categories, setCategories] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)

    useEffect(() => {
        setLoading(true)
        if (!jsCookie.get('accessToken')) {
            return navigate('/administrator/login')
        }

        getCategories(page, perPage)
            .then(res => {
                if (res.status === 200) {
                    setCategories(res.data.categories)
                    setTotalRecords(res.data.totalRecords)
                    setLoading(false);
                }
            })
    }, [page])

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
                                {categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <Link to={`/edit-category/${category._id}`} className="btn btn-sm btn-primary"><i className="fa fa-edit"></i></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination total={totalRecords ? totalRecords : 1} current={page} length={perPage} setPage={setPage} />
                    </div>
                </div>
            </div>
        )
}

export default Category