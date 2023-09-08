import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ExtendedRequest, Express } from "../types/type"
import { error } from "console"

export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
	return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string): Promise<string> => {
	return bcrypt.hash(password, 5)
}

export const createJWT = (user: User) => {
	if (typeof process.env.JWT_SECRET === "undefined") throw error("Invalid Token, ENV not Setup")
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		process.env.JWT_SECRET
	)
	return token
}

export const protect = (req: ExtendedRequest, res: Express.Response, next: Express.NextFunction) => {
	if (typeof process.env.JWT_SECRET === "undefined") return
	const bearer = req.headers.authorization
	if (!bearer) return res.status(401), res.json({ message: "Not authorized" })
	const [, token] = bearer.split(" ")
	if (!token) return res.status(401), res.json({ message: "Not authorized" })

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET)
		if (typeof user !== "string") {
			req.user = user
			next()
		}
	} catch (e) {
		res.status(401)
		res.json({ message: "Invalid Token" })
	}
}
