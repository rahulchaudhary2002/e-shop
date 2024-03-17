import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "../validationSchemas/AuthValidationSchemas.js";

const validateRegisterRequest = async (req, res, next) => {
    try {
        await registerSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

const validateLoginRequest = async (req, res, next) => {
    try {
        await loginSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

const validateForgotPasswordRequest = async (req, res, next) => {
    try {
        await forgotPasswordSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

const validateResetPasswordRequest = async (req, res, next) => {
    try {
        await resetPasswordSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

const validateChangePasswordRequest = async (req, res, next) => {
    try {
        await changePasswordSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ status: 400, validation: error });
    }
};

export {
    validateRegisterRequest,
    validateLoginRequest,
    validateForgotPasswordRequest,
    validateResetPasswordRequest,
    validateChangePasswordRequest
};