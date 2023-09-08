import prisma from "../db"
import { comparePasswords, createJWT, hashPassword } from "../modules/auth"
import { Express } from "../types/type"

export const createNewUser = async (req: Express.Request, res: Express.Response) => {
	try {
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: await hashPassword(req.body.password),
			},
		})
		const token = createJWT(user)
		res.status(200)
		res.json({ token })
	} catch (e: any) {
		res.status(401)
		console.log(e)
		res.json({ message: "Unable to create new User" })
	}
}

export const signIn = async (req: Express.Request, res: Express.Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				username: req.body.username,
			},
		})
		if (!user) return res.status(401), res.json({ message: "User Does Not Exist" })

		const isValid = await comparePasswords(req.body.password, user.password)

		if (!isValid) return res.status(401), res.json({ message: "Incorrect Password" })

		const token = createJWT(user)
		res.json({ token })
	} catch (e: any) {
		res.status(401)
		console.log(e)
		res.json({ message: "Unable to Sign In" })
	}
}
