export const typeDefs = `#graphql
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    email: String!
    name: String!
    roles: [Role!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthPayload {
    accessToken: String!
    user: User!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;


