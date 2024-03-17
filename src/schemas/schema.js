
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
    owner: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Query {
    books: [Book!]!
    users: [User!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, ownerId: ID!): Book!
    // Add other mutation types for CRUD operations
  }
`);

module.exports = schema;
