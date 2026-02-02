import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { JwtClaims } from "../types/domain";

function parseDurationToSeconds(input: string): number {
	const trimmed = input.trim();
	const m = /^(\d+)(ms|s|m|h|d)?$/.exec(trimmed);
	if (!m) {
		const asNum = Number(trimmed);
		return Number.isFinite(asNum) ? Math.max(0, Math.floor(asNum)) : 900; // default 15m
	}
	const amount = Number(m[1]);
	const unit = m[2] || "s";
	switch (unit) {
		case "ms":
			return Math.max(0, Math.floor(amount / 1000));
		case "s":
			return Math.max(0, Math.floor(amount));
		case "m":
			return Math.max(0, Math.floor(amount * 60));
		case "h":
			return Math.max(0, Math.floor(amount * 60 * 60));
		case "d":
			return Math.max(0, Math.floor(amount * 60 * 60 * 24));
		default:
			return 900;
	}
}

export function signAccessToken(claims: JwtClaims): string {
	const secret: Secret = env.JWT_SECRET as unknown as Secret;
	const expiresInSeconds = parseDurationToSeconds(env.JWT_EXPIRES_IN);
	const options: SignOptions = { expiresIn: expiresInSeconds };
	return jwt.sign(claims, secret, options);
}

export function verifyAccessToken(token: string): JwtClaims {
	return jwt.verify(token, env.JWT_SECRET) as JwtClaims;
}


