import * as yup from 'yup';
import { API_URL } from '../constants'
import jsCookie from 'js-cookie';
import { createOrderSchema } from '../common/validations/OrderValidation';

const createOrder = async (state, carts, setError) => {
    try {
        await createOrderSchema.validate(state, { abortEarly: false });

        const response = await fetch(`${API_URL}/api/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: JSON.stringify({carts, province: state.province, district: state.district, municipality: state.municipality, street: state.street})
        });

        const res = await response.json();

        if (res.status !== 200 && res.validation) {
            const newErrors = {};
            res.validation.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setError(newErrors);
        }

        return res

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const newErrors = {};
            error.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setError(newErrors);
        }
        return error
    }
}

export {
    createOrder
}