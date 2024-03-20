import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loading from '../../common/components/Loading';
import { getCategories } from '../../api/CategoryApi';
import { setCategories, setTotalRecords } from '../../features/categorySlice';
import { API_URL } from '../../constants';
import { setProducts, setPage, setTotalRecords as setTotalProductRecords } from '../../features/productSlice';
import { getProducts } from '../../api/ProductApi';

const Home = () => {
    const dispatch = useDispatch()
    const categorySelector = useSelector(state => state.category)
    const productSelector = useSelector(state => state.product)
    const [loading, setLoading] = useState(true)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        setLoading(true);

        Promise.all([
            getCategories(categorySelector.page, categorySelector.perPage),
            getProducts(productSelector.page, productSelector.perPage)
        ]).then(([categoriesRes, productsRes]) => {
            if (categoriesRes.status === 200) {
                dispatch(setCategories(categoriesRes.data.categories));
                dispatch(setTotalRecords(categoriesRes.data.totalRecords));
            }

            if (productsRes.status === 200) {
                dispatch(setProducts(productsRes.data.products));
                dispatch(setTotalProductRecords(productsRes.data.totalRecords));
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [dispatch]);

    const loadMore = () => {
        setDisable(true)
        getProducts(productSelector.page + 1, productSelector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setProducts([...productSelector.products, ...res.data.products]));
                    dispatch(setPage(res.data.page))
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            }).finally(() => {
                setDisable(false);
            });

    }

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
                    {productSelector.products.map((product, index) => (
                        <div className="col-md-3 col-sm-6" key={index}>
                            <div className="card mb-3">
                                <img src={`${API_URL}/${product.image}`} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <p className="card-text">{product.name}</p>
                                    <p className="card-text"><small className="text-primary">RS {product.price}</small></p>
                                    <Link href="" className='btn btn-primary w-100'>Add to cart</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-12 text-center"><button className='btn btn-primary mb-3' onClick={loadMore} disabled={disable} hidden={productSelector.products.length >= productSelector.totalRecords ? true : false}>Load More</button></div>
                </div>
            </>
        )
}

export default Home