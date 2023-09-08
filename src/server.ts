import Express from "express"
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth"
import { createNewUser, signIn } from "./handlers/user"

const app = Express()
app.use(cors())
app.use(morgan("dev"))
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.use((req: Express.Request, _res: Express.Response, next: Express.NextFunction) => {
	next()
})

app.get("/", (req: Express.Request, res: Express.Response) => {
	res.status(200)
	res.json({
		message: "hello",
	})
})

app.use("/api", protect, router)
app.post("/user", createNewUser)
app.post("/sign-in", signIn)

// Incase  any errors havnt been caught
app.use((err: any, req: Express.Request, res: Express.Response) => {
	// Added types for future implementations
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
export default app
