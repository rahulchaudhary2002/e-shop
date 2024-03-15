import { Router } from "express"
import { changeCurrentPassword, login, logout, refreshAccessToken, register, verify } from "../controllers/AuthController.js";
import verifyJWT from "../middlewares/AuthMiddleware.js"
const router = Router();

router.route('/register').post(register)
router.route('/verify/:token').get(verify)
router.route('/login').post(login)
router.route("/logout").post(verifyJWT,  logout)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)

export default router