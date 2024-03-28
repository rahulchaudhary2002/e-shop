import { createOrderSchema } from "../validationSchemas/OrderValidationSchemas.js";

const validateCreateOrderRequest = async (req, res, next) => {
    try {
        await createOrderSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

export {
    validateCreateOrderRequest
}