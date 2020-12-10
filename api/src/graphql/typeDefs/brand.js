const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllBrand(input:InputGetBrand):[Brand!]
    }
    extend type Mutation {
        createBrand(input: InputBrand): Result!
    }
   
    input InputBrand{
        name: String,
        label: String,
        category: [ID!]!,
        image: Upload!
    }

    input InputGetBrand{
        page: Int,
        limit: Int
    }

`;

module.exports = typeDefs