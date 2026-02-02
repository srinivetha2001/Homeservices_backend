import bcrypt from "bcryptjs";
import { env } from "../config/env";

export async function hashPassword(plain: string): Promise<string> {
	const rounds = env.BCRYPT_SALT_ROUNDS;
	return bcrypt.hash(plain, rounds);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
	return bcrypt.compare(plain, hash);
}


