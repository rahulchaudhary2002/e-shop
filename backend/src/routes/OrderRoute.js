import { Router } from "express"
import verifyJWT from "../middlewares/AuthMiddleware.js";
import { createOrder, getOrders } from "../controllers/OrderController.js";
import { validateCreateOrderRequest } from "../requests/OrderValidation.js";

const router = Router()

router.route("/get-order").get(verifyJWT, getOrders);
router.route("/create-order").post(verifyJWT, validateCreateOrderRequest, createOrder)

export default router