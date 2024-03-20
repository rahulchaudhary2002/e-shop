import * as yup from 'yup';

const createProductSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    brand: yup.string().required('Brand is required.'),
    price: yup.number().positive().required('Price is required.'),
    category: yup.string().required('Category is required.')
});

export {
    createProductSchema
}