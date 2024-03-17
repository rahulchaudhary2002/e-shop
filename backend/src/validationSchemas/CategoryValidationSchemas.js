import * as yup from 'yup';

const createCategorySchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
});

export {
    createCategorySchema
}