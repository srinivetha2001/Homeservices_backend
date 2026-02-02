import { commonTypeDefs, commonResolvers } from "./common";
import { userTypeDefs, userResolvers, userInputTypeDefs } from "./user";

export const typeDefs = [commonTypeDefs, userTypeDefs, userInputTypeDefs];
export const resolvers = [commonResolvers, userResolvers];


