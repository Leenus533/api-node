import { Router } from "express"
import { body } from "express-validator"
import { checkForErrors } from "./modules/middlewares"
import { createNewProduct, deleteProduct, getProducts, getSingleProduct, updateProductName } from "./handlers/product"
import { Express } from "./types/type"

const router: any = Router()

router.get("/product", getProducts)
router.post("/product", body("name").isString(), checkForErrors, createNewProduct)
router.get("/product/:id", getSingleProduct)
router.delete("/product/:id", deleteProduct)

router.use((err: any, req: Express.Request, res: Express.Response) => {
	if (err.type === "auth") {
		res.status(401).json({ message: "unauthorized" })
	} else if (err.type === "input") {
		res.status(401).json({ message: "invalid input" })
	} else if (err.type === "server") {
		res.status(500).json({ message: "server error" })
	} else {
		res.status(500).json({
			message: "Unknown Error Occured",
		})
	}
})

export default router
