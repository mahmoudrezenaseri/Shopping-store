const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    getAllFiles(page: Int, limit:Int): [Files]!
  }

  extend type Mutation {
    createFile(Image: Upload!): Result!
  }

`;

module.exports = typeDefs;
