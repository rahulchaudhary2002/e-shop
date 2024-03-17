import { Router } from "express"
import { changeCurrentPassword, checkResetPasswordToken, forgetPassword, getCurrentUser, login, logout, refreshAccessToken, register, resetPassword, verify } from "../controllers/AuthController.js";
import verifyJWT from "../middlewares/AuthMiddleware.js"
import { validateChangePasswordRequest, validateForgotPasswordRequest, validateLoginRequest, validateRegisterRequest, validateResetPasswordRequest } from "../requests/AuthValidation.js";

const router = Router();

router.route('/register').post(validateRegisterRequest, register);
router.route('/verify/:token').post(verify);
router.route('/login').post(validateLoginRequest, login);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").patch(verifyJWT, validateChangePasswordRequest, changeCurrentPassword);
router.route("/forget-password").post(validateForgotPasswordRequest, forgetPassword);
router.route("/check-reset-password-token").post(checkResetPasswordToken);
router.route("/reset-password/:token").put(validateResetPasswordRequest, resetPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router