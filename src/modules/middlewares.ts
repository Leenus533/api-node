import { validationResult } from "express-validator"
import { Express } from "../types/type"

export const checkForErrors = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.status(400)
		res.json({ errors: errors.array() })
	} else {
		next()
	}
}
