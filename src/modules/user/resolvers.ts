import mongoose from "mongoose";
import { User } from "./model";
import { hashPassword, verifyPassword } from "../../utils/password";
import { signAccessToken } from "../../utils/jwt";
import { GraphQLContext, Role } from "../../types/domain";
import { QueryOp, MutationOp } from "../common/operations";

export const resolvers = {
	Query: {
		[QueryOp.Me]: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
			if (!ctx.user) return null;
			return User.findById(ctx.user.id);
		}
	},
	Mutation: {
		[MutationOp.Register]: async (
			_: unknown,
			args: { input: { email: string; name: string; password: string; role: Role } }
		) => {
			const { email, name, password, role } = args.input;
			const existing = await User.findOne({ email });
			if (existing) {
				throw new Error("Email is already registered");
			}
			const passwordHash = await hashPassword(password);
			const user = await User.create({ email, name, passwordHash, roles: [role] });
			const accessToken = signAccessToken({
				sub: user.id,
				email: user.email,
				roles: user.roles
			});
			return { accessToken, user };
		},
		[MutationOp.Login]: async (_: unknown, args: { input: { email: string; password: string } }) => {
			const { email, password } = args.input;
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error("Invalid credentials");
			}
			const valid = await verifyPassword(password, user.passwordHash);
			if (!valid) {
				throw new Error("Invalid credentials");
			}
			const accessToken = signAccessToken({
				sub: user.id,
				email: user.email,
				roles: user.roles
			});
			return { accessToken, user };
		}
	},
	User: {
		id: (u: mongoose.Document) => u._id.toString()
	}
};


