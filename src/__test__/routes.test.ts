import app from "../server"
import supertest from "supertest"

describe("GET /", () => {
	test("it should return status 200 with a message", async () => {
		const res = await supertest(app).get("/")
		expect(res.body.message).toBe("hello")
	})
})
