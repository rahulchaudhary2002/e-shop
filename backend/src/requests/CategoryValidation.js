import { createCategorySchema } from "../validationSchemas/CategoryValidationSchemas.js";

const validateCreateCategoryRequest = async (req, res, next) => {
    try {
        await createCategorySchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

export {
    validateCreateCategoryRequest
}