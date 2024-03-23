import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../common/components/Loading'
import { getCarts, removeCart, updateCart } from '../../api/CartApi'
import { setCarts } from '../../features/cartSlice'
import { API_URL } from '../../constants'
import { toast } from 'react-toastify'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.cart)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!jsCookie.get('accessToken'))
            return navigate('/login')
        else
            getCarts()
                .then(res => {
                    if (res.status === 200)
                        dispatch(setCarts(res.data.carts))
                })
                .finally(() => {
                    setLoading(false)
                })
    }, [])

    const handleChange = (id, e) => {
        if (e.target.value > 0) {
            const updatedCarts = selector.carts.map(cart =>
                cart._id === id ? { ...cart, number_of_product: e.target.value } : cart
            );
            dispatch(setCarts(updatedCarts))
        }
    }

    const handleBlur = (id, e) => {
        if (e.target.value > 0)
            updateCart(id, e.target.value)
                .then(res => {
                    if (res.status === 200) {
                        const updatedCarts = selector.carts.map(cart =>
                            cart._id === id ? { ...cart, ...res.data.cart } : cart
                        );
                        dispatch(setCarts(updatedCarts))
                    }
                    else {
                        toast.error(res.error)
                    }
                })
    };

    const increment = (id, number_of_product) => {
        updateCart(id, number_of_product + 1)
            .then(res => {
                if (res.status === 200) {
                    const updatedCarts = selector.carts.map(cart =>
                        cart._id === id ? { ...cart, ...res.data.cart } : cart
                    );

                    dispatch(setCarts(updatedCarts))
                }
                else {
                    toast.error(res.error)
                }
            })
    }

    const decrement = (id, number_of_product) => {
        if (number_of_product - 1 > 0) {
            updateCart(id, number_of_product - 1)
                .then(res => {
                    if (res.status === 200) {
                        const updatedCarts = selector.carts.map(cart =>
                            cart._id === id ? { ...cart, ...res.data.cart } : cart
                        );
                        dispatch(setCarts(updatedCarts))
                    }
                    else {
                        toast.error(res.error)
                    }
                })
        }
    }

    const remove = (id) => {
        removeCart(id)
            .then(res => {
                if (res.status === 200) {
                    const updatedCarts = selector.carts.filter(cart =>
                        cart._id != id
                    );

                    dispatch(setCarts(updatedCarts))
                }
                else {
                    toast.error(res.error)
                }
            })
    }

    if (loading)
        return <Loading />
    else
        return (
            <div className='card'>
                <div className="card-body">
                    <div className="row gap-3">
                        {selector.carts.length > 0 ? selector.carts.map((cart, index) => (
                            <div className="col-md-12" key={index}>
                                <div className="d-flex justify-content-between align-items-center w-100 gap-2 flex-wrap">
                                    <img src={`${API_URL}/${cart.product.image}`} alt={cart.product.name} width={60} height={60} />
                                    <div>
                                        <h5>{cart.product.name}</h5>
                                        Brand: <a href="#" className="text-primary text-decoration-none">{cart.product.brand}</a>
                                    </div>
                                    <div>
                                        <strong className="text-primary h5">Rs. {cart.product.price}</strong><br />
                                        <small className="text-gray"><del>Rs. 4000</del></small> <small>-50%</small>
                                    </div>
                                    <div className="input-group w-25">
                                        <button className="btn btn-secondary w-25" type="button" onClick={() => decrement(cart._id, cart.number_of_product)}><span className="fa fa-minus"></span></button>
                                        <input type="text" className="form-control text-center w-25" value={cart.number_of_product} onChange={(e) => handleChange(cart._id, e)} onBlur={(e) => handleBlur(cart._id, e)} />
                                        <button className="btn btn-secondary w-25" type="button" onClick={() => increment(cart._id, cart.number_of_product)}><span className="fa fa-plus"></span></button>
                                    </div>
                                    <button type="button" className="btn btn-danger" onClick={() => remove(cart._id)}><i className="fa fa-trash"></i></button>
                                </div>
                            </div>
                        )) :
                            <div> No product in your cart.</div>
                        }
                    </div>
                </div>
            </div>
        )
}

export default Cart