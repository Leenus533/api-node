import merge from "lodash.merge"

process.env.NODE_ENV = process.env.NODE_ENV || "development"

const stage = process.env.STAGE || "local"

let envConfg

if (stage === "production") {
	envConfg = require("./production").default
} else if (stage === "testing") {
	envConfg = require("./testing").default
} else {
	envConfg = require("./local").default
}

export default merge(
	{
		stage,
		env: process.env.NODE_ENV,
		port: 3001,
		secrets: {
			jwt: process.env.JWT_SECRET,
			dbUrl: process.env.DATABASE_URL,
		},
	},
	envConfg
)
