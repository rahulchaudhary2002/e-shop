import { API_URL } from "../constants";
import jsCookie from "js-cookie"

const getCarts = async () => {
    const response = await fetch(`${API_URL}/api/get-cart`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jsCookie.get('accessToken')}`
        }
    });

    return await response.json()
}

const createCart = async (product, number_of_product = 1) => {
    try {
        const response = await fetch(`${API_URL}/api/create-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: JSON.stringify({ product, number_of_product })
        });

        return await response.json();

    } catch (error) {
        return error
    }
}

const updateCart = async (id, number_of_product = 1) => {
    try {
        const response = await fetch(`${API_URL}/api/update-cart/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: JSON.stringify({ number_of_product })
        });

        return await response.json();

    } catch (error) {
        return error
    }
}

const removeCart = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/remove-cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
        });

        return await response.json();

    } catch (error) {
        return error
    }
}

export {
    getCarts,
    createCart,
    updateCart,
    removeCart
}