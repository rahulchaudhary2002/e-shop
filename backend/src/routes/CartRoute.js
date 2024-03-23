import { Router } from "express"
import verifyJWT from "../middlewares/AuthMiddleware.js";
import { createCart, getCarts, removeCart, updateCart } from "../controllers/CartController.js";

const router = Router()

router.route("/get-cart").get(verifyJWT, getCarts);
router.route("/create-cart").post(verifyJWT, createCart)
router.route("/update-cart/:id").put(verifyJWT, updateCart)
router.route("/remove-cart/:id").delete(verifyJWT, removeCart)

export default router