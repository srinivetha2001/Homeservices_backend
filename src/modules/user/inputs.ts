export const userInputTypeDefs = `#graphql
  input RegisterInput {
    email: String!
    name: String!
    password: String!
    role: Role!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;


