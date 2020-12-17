const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    getAllFiles(page: Int, limit:Int): [Files]!
  }

  extend type Mutation {
    createFile(Image: Upload!): ResultFile!
  }

  type Files {
    name: String,
    dimWidth: String,
    dimHeight: String,
    format: String,
    dir: String,
    createdAt:Date
}

  type ResultFile {
    status: Int,
    message: String,
    data: Files
}

`;

module.exports = typeDefs;
