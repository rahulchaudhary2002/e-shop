import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <h2 className="text-center text-muted">Categories</h2>
            <div className="row">
                <div className="col-md-2 col-sm-6">
                    <div className="card mb-2">
                        <img src="/logo.png" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">This is category title </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6">
                    <div className="card mb-2">
                        <img src="/logo.png" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">This is category title </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6">
                    <div className="card mb-2">
                        <img src="/logo.png" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">This is category title </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6">
                    <div className="card mb-2">
                        <img src="/logo.png" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">This is category title </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6">
                    <div className="card mb-2">
                        <img src="/logo.png" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">This is category title </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6">
                    <div className="card mb-2">
                        <img src="/logo.png" className="card-img-top" alt="" />
                        <div className="card-body">
                            <p className="card-text">This is category title </p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-center text-muted mt-3">Just For You</h2>
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