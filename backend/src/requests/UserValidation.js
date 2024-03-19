import { createUserSchema, updateUserSchema } from "../validationSchemas/UserValidationSchemas.js";

const validateCreateUserRequest = async (req, res, next) => {
    try {
        await createUserSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

const validateUpdateUserRequest = async (req, res, next) => {
    try {
        await updateUserSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

export {
    validateCreateUserRequest,
    validateUpdateUserRequest
}