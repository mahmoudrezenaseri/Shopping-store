const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    getAllFiles(page: Int, limit:Int, searchText: String): FilesInfo!
  }

  extend type Mutation {
    createFile(image: Upload!): ResultFile!
  }

  type Files {
    _id: String,
    name: String,
    dimWidth: String,
    dimheight: String,
    format: String,
    dir: String,
    createdAt:Date
}

type FilesInfo{
  totalDocs : Int,
  hasNextPage: Boolean,
  page: Int,
  files: [Files]
}

  type ResultFile {
    status: Int,
    message: String,
    data: Files
}

`;

module.exports = typeDefs;
