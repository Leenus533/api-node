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
	console.log("Hello from express")
	res.status(200)
	res.json({
		message: "hello",
	})
})

app.use("/api", protect, router)
app.post("/user", createNewUser)
app.post("/sign-in", signIn)

export default app
