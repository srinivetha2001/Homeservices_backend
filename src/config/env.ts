import { cleanEnv, port, str, url, num } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
	// App
	NODE_ENV: str({ choices: ["development", "test", "production"], default: "development" }),
	PORT: port({ default: 4000 }),

	// Database
	MONGO_URI: url(),

	// Auth
	JWT_SECRET: str(),
	JWT_EXPIRES_IN: str({ default: "15m" }),
	REFRESH_TOKEN_SECRET: str({ default: "" }),
	REFRESH_TOKEN_EXPIRES_IN: str({ default: "7d" }),

	// Misc
	BCRYPT_SALT_ROUNDS: num({ default: 12 })
});


