import { Router } from "express"
import verifyJWT from "../middlewares/AuthMiddleware.js";
import { createOrder, getCustomerOrders, getOrders, updateOrder } from "../controllers/OrderController.js";
import { validateCreateOrderRequest } from "../requests/OrderValidation.js";

const router = Router()

router.route("/get-order").get(verifyJWT, getOrders);
router.route("/get-customer-order").get(verifyJWT, getCustomerOrders);
router.route("/create-order").post(verifyJWT, validateCreateOrderRequest, createOrder)
router.route("/update-order/:id").put(verifyJWT, updateOrder)

export default router