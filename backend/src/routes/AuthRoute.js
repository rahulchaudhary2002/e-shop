import { Router } from "express"
import { changeCurrentPassword, checkResetPasswordToken, forgetPassword, login, logout, refreshAccessToken, register, resetPassword, verify } from "../controllers/AuthController.js";
import verifyJWT from "../middlewares/AuthMiddleware.js"
const router = Router();

router.route('/register').post(register)
router.route('/verify/:token').post(verify)
router.route('/login').post(login)
router.route("/logout").post(verifyJWT, logout)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").patch(verifyJWT, changeCurrentPassword)
router.route("/forget-password").post(forgetPassword)
router.route("/check-reset-password-token").post(checkResetPasswordToken)
router.route("/reset-password/:token").put(resetPassword)

export default router