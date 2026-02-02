import { Request, Response } from "express";

export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
	SUPER_ADMIN = "SUPER_ADMIN",
	PROVIDER = "PROVIDER"
}

export interface JwtClaims {
	sub: string;
	email: string;
	roles: Role[];
}

export interface GraphQLContext {
	req: Request;
	res: Response;
	user?: {
		id: string;
		email: string;
		roles: Role[];
	};
}


