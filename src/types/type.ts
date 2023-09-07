import { User } from "@prisma/client"
import Express from "express"
import { JwtPayload } from "jsonwebtoken"

interface ExtendedRequest extends Express.Request {
	user?: string | JwtPayload | User
}

export { ExtendedRequest, Express }
