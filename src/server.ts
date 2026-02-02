import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers, typeDefs } from "./modules";
import { env } from "./config/env";
import { GraphQLContext, Role } from "./types/domain";
import { verifyAccessToken } from "./utils/jwt";
import { connectToDatabase } from "./db/connect";

export async function buildServer() {
	const app = express();

	app.use(helmet());
	app.use(
		cors({
			origin: true,
			credentials: true
		})
	);
	app.use(morgan("dev"));
	app.use(bodyParser.json());

	const server = new ApolloServer<GraphQLContext>({
		typeDefs,
		resolvers
	});
	await server.start();

	app.use(
		"/graphql",
		expressMiddleware(server, {
			context: async ({ req, res }): Promise<GraphQLContext> => {
				let user: GraphQLContext["user"];
				const authHeader = req.headers.authorization || "";
				const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
				if (token) {
					try {
						const claims = verifyAccessToken(token);
						user = { id: claims.sub, email: claims.email, roles: claims.roles as Role[] };
					} catch {
						user = undefined;
					}
				}
				return { req, res, user };
			}
		})
	);

	app.get("/health", (_req, res) => res.json({ status: "ok" }));

	return app;
}

export async function start() {
	await connectToDatabase();
	const app = await buildServer();
	app.listen(env.PORT, () => {
		// eslint-disable-next-line no-console
		console.log(`🚀 Server ready at http://localhost:${env.PORT}/graphql`);
	});
}


