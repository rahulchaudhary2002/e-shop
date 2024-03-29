import { Router } from "express"
import { createProduct, findByCategory, findById, getProducts, updateProduct } from "../controllers/ProductController.js";
import verifyJWT, { hasRole } from "../middlewares/AuthMiddleware.js";
import uploadProductImage from "../utils/UploadProductImage.js";
import { validateCreateProductRequest } from "../requests/ProductValidation.js";

const router = Router()

router.route("/get-product").get(getProducts);
router.route("/create-product").post(verifyJWT, hasRole(['admin', 'vendor']), uploadProductImage.single('file'), validateCreateProductRequest, createProduct)
router.route("/update-product/:id").put(verifyJWT, hasRole(['admin', 'vendor']), uploadProductImage.single('file'), validateCreateProductRequest, updateProduct)
router.route("/product/:id").get(findById)
router.route("/product/category/:id").get(findByCategory)

export default router