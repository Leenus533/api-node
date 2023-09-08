import * as user from "../user"

describe("user Handler ", () => {
	it("it should create a new user", async () => {
		let req: any = {
			body: {
				username: "username1",
				password: "passwrod2",
			},
		}
		let status = (number: any) => {
			return number
		}
		const res: any = {
			json({ token }: any) {
				expect(token).toBeTruthy()
			},
			status,
		}

		const newUser = await user.createNewUser(req, res)
		console.log(newUser)
	})
})
