import { GraphQLScalarType, Kind } from "graphql";
import { QueryOp } from "./operations";

const DateScalar = new GraphQLScalarType<Date | null, number>({
	name: "Date",
	description: "Date custom scalar type",
	parseValue(value) {
		return new Date(value as number);
	},
	serialize(value) {
		return (value as Date).getTime();
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(parseInt(ast.value, 10));
		}
		return null;
	}
});

export const resolvers = {
	Date: DateScalar,
	Query: {
		[QueryOp.Health]: () => "ok"
	}
};


