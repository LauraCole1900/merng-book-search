const { gql } = require("apollo-server-express");


const typeDefs = gql`

#################
#     Types     #
#################

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  savedBooks: [Book!]
}

type Book {
  _id: ID!
  authors: [String!]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}

type Auth {
  token: ID!
  user: User
}


##################
#     Inputs     #
##################

input BookInput {
  _id: ID!
  authors: [String!]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}


#################
#    Queries    #
#################

type Query {
  getSingleUser: User
  me: User
}


#################
#   Mutations   #
#################

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth

  login(email: String! password: String!): Auth

  saveBook(_id: ID!, savedBooks: BookInput!): User

  deleteBook(_id: ID!, bookId: String!): User
}
`;

module.exports = typeDefs;