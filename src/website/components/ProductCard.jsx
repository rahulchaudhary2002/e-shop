import React from 'react'
import { API_URL } from '../../constants'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const addToCart = async (id) => {

    }

    return (
        <div className="card mb-3">
            <Link to={`/product/${product._id}`} className='text-decoration-none' >
                <img src={`${API_URL}/${product.image}`} className="card-img-top" alt={product.name} height={200} />
                <div className="card-body">
                    <p className="card-text text-dark h5">{product.name}</p>
                    <p className="card-text h4"><small className="text-primary">Rs. {product.price}</small></p>
                </div>
            </Link>
            <button type="buttton" className='btn btn-primary w-100' style={{ 'borderRadius': '0px 0px 5px 5px' }} onClick={() => {addToCart(product._id)}}>Add to cart</button>
        </div>
    )
}

export default ProductCard