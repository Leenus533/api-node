import e from "express"
import prisma from "../db"
import { Express, ExtendedRequest } from "../types/type"
import { title } from "process"

export const getProducts = async (req: ExtendedRequest, res: Express.Response) => {
	try {
		if (typeof req.user === "string") throw e
		const user = await prisma.user.findUnique({
			where: {
				id: req.user?.id,
			},
			include: {
				products: true,
			},
		})
		res.status(200)
		res.json({
			data: user?.products,
		})
	} catch (e) {
		res.status(401)
		res.json({
			message: "Error Occured",
		})
	}
}

export const createNewProduct = async (req: ExtendedRequest, res: Express.Response) => {
	try {
		if (typeof req.user === "string") throw e
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				belongsToId: req.user?.id,
			},
		})
		if (product) {
			res.status(200)
			res.json({
				message: "success",
			})
		}
	} catch (e) {
		res.status(401)
		res.json({ message: "Unable to create new Product" })
	}
}

export const getSingleProduct = async (req: ExtendedRequest, res: Express.Response) => {
	const id = req.params.id
	try {
		if (typeof req.user === "string") throw e
		const product = await prisma.product.findFirst({
			where: {
				id,
				belongsToId: req.user?.id,
			},
		})
		if (product === null) {
			res.status(404)
			res.json({ message: "Product Not found" })
		} else {
			res.status(200)
			res.json({ data: product })
		}
	} catch (e) {
		res.status(404)
		res.json({ message: "Unable to find Product" })
	}
}

export const deleteProduct = async (req: ExtendedRequest, res: Express.Response) => {
	const id = req.params.id
	try {
		if (typeof req.user === "string") throw e
		const product = await prisma.product.delete({
			where: {
				id,
				belongsToId: req.user?.id,
			},
		})
		res.status(200)
		res.json({ message: "Product has been deleted" })
	} catch (e) {
		res.status(404)
		res.json({ message: "Unable to delete Product" })
	}
}
export const updateProductName = async (req: ExtendedRequest, res: Express.Response) => {
	const id = req.params.id
	try {
		if (typeof req.user === "string") throw e
		const product = await prisma.product.update({
			where: {
				id,
				belongsToId: req.user?.id,
			},
			data: {
				name: req.body.name,
			},
		})
		res.status(200)
		res.json({ data: product })
	} catch (e) {
		res.status(404)
		res.json({ message: "Unable to update Product" })
	}
}
