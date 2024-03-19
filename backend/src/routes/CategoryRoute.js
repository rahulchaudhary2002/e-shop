import { Router } from "express"
import { createCategory, getCategories, updateCategory } from "../controllers/CategoryController.js";
import verifyJWT, { hasRole } from "../middlewares/AuthMiddleware.js";
import uploadCategoryImage from "../utils/UploadCategoryImage.js";
import { validateCreateCategoryRequest } from "../requests/CategoryValidation.js";

const router = Router()

router.route("/get-category").get(getCategories);
router.route("/create-category").post(verifyJWT, hasRole(['admin']), uploadCategoryImage.single('file'), validateCreateCategoryRequest, createCategory)
router.route("/update-category/:id").put(verifyJWT, hasRole(['admin']), uploadCategoryImage.single('file'), validateCreateCategoryRequest, updateCategory)

export default router