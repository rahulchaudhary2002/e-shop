import * as yup from 'yup';
import { API_URL } from '../constants'
import jsCookie from 'js-cookie';
import { createCategorySchema } from '../common/validations/CategoryValidation';

const getCategories = async (page, perPage) => {
    const response = await fetch(`${API_URL}/api/get-category?page=${page}&perPage=${perPage}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jsCookie.get('accessToken')}`
        },
    });

    return await response.json()
}

const createCategory = async (state, setError) => {
    try {
        await createCategorySchema.validate(state, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('file', state.file);

        const response = await fetch(`${API_URL}/api/create-category`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jsCookie.get('accessToken')}`
            },
            body: formData
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
    getCategories,
    createCategory
}