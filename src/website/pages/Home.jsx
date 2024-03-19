import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loading from '../../common/components/Loading';
import { getCategories } from '../../api/CategoryApi';
import { setCategories, setTotalRecords } from '../../features/categorySlice';
import { API_URL } from '../../constants';

const Home = () => {
    const dispatch = useDispatch()
    const categorySelector = useSelector(state => state.category)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        getCategories(categorySelector.page, categorySelector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setCategories(res.data.categories))
                    dispatch(setTotalRecords(res.data.totalRecords))
                }
                setLoading(false);
            })
    }, [dispatch])

    if (loading)
        return <Loading />
    else
        return (
            <>
                <h2 className="text-center text-primary">Categories</h2>
                <div className="row">
                    {categorySelector.categories.map((category, index) => (
                        <div className="col-md-2 col-sm-6" key={index}>
                            <div className="card mb-2">
                                <img src={`${API_URL}/${category.image}`} className="card-img-top" alt={category.name} />
                                <div className="card-body">
                                    <p className="card-text">{category.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="text-center text-primary mt-3">Just For You</h2>
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <div className="card mb-3">
                            <img src="/logo.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <p className="card-text">This is product title  </p>
                                <p className="card-text"><small className="text-primary">RS 750</small></p>
                                <Link href="" className='btn btn-primary w-100'>Add to cart</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card mb-3">
                            <img src="/logo.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <p className="card-text">This is product title  </p>
                                <p className="card-text"><small className="text-primary">RS 750</small></p>
                                <Link href="" className='btn btn-primary w-100'>Add to cart</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card mb-3">
                            <img src="/logo.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <p className="card-text">This is product title  </p>
                                <p className="card-text"><small className="text-primary">RS 750</small></p>
                                <Link href="" className='btn btn-primary w-100'>Add to cart</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card mb-3">
                            <img src="/logo.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <p className="card-text">This is product title  </p>
                                <p className="card-text"><small className="text-primary">RS 750</small></p>
                                <Link href="" className='btn btn-primary w-100'>Add to cart</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card mb-3">
                            <img src="/logo.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <p className="card-text">This is product title  </p>
                                <p className="card-text"><small className="text-primary">RS 750</small></p>
                                <Link href="" className='btn btn-primary w-100'>Add to cart</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card mb-3">
                            <img src="/logo.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <p className="card-text">This is product title  </p>
                                <p className="card-text"><small className="text-primary">RS 750</small></p>
                                <Link href="" className='btn btn-primary w-100'>Add to cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default Home