import { Router } from "express"
import { createCategory, getCategories } from "../controllers/CategoryController.js";
import verifyJWT, { hasRole } from "../middlewares/AuthMiddleware.js";
import uploadCategoryImage from "../utils/UploadCategoryImage.js";
import { validateCreateCategoryRequest } from "../requests/CategoryValidation.js";

const router = Router()

router.route("/get-category").get(verifyJWT, hasRole(['admin', 'vendor']), getCategories);
router.route("/create-category").post(verifyJWT, hasRole(['admin', 'vendor']), uploadCategoryImage.single('file'), validateCreateCategoryRequest, createCategory)

export default router