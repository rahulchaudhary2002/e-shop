import { Router } from "express"
import verifyJWT, { hasRole } from "../middlewares/AuthMiddleware.js";
import { createUser, getUsers, updateUser } from "../controllers/UserController.js";
import { validateCreateUserRequest, validateUpdateUserRequest } from "../requests/UserValidation.js";

const router = Router();

router.route('/get-user').get(verifyJWT, hasRole(['admin']), getUsers);
router.route("/create-user").post(verifyJWT, hasRole(['admin']), validateCreateUserRequest, createUser)
router.route("/update-user/:id").put(verifyJWT, hasRole(['admin']), validateUpdateUserRequest, updateUser)

export default router