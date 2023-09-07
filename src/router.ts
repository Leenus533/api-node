import { Router } from "express"
import { ExtendedRequest, Express } from "./types/type"
import { body, validationResult } from "express-validator"
import { checkForErrors } from "./modules/middlewares"
import { createNewProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "./handlers/product"

const router = Router()

router.get("/product", getProducts)
router.get("/product/:id", getSingleProduct)
router.post("/product/:id", body("name").isString(), checkForErrors, createNewProduct)
router.delete("/product/:id", deleteProduct)

router.get("/update", () => {})
router.get("/update/:id", updateProduct)
router.put(
	"/update/:id",
	body("title").optional(),
	body("body").optional(),
	body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
	body("version").optional(),
	checkForErrors,
	() => {}
)
router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
	body("productId").exists().isString(),
	() => {}
)
router.get("/update-point", () => {})
router.get("/update-point/:id", () => {})
router.put("/update-point/:id", body("name").optional().isString(), body("description").optional().isString(), () => {})
router.post(
	"/update-point",
	body("name").isString(),
	body("description").isString(),
	body("updateId").exists().isString(),
	() => {}
)
router.delete("/update-point/:id", () => {})

export default router
