const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllBrand(input:InputGetBrand):[Brand!]
    }
    extend type Mutation {
        createBrand(input: InputBrand): ResultBrand!
    }
    
    type Brand{
        _id: ID,
        name: String,
        label: String,
        image: String,
        category: [Category]
    }    
    
    type ResultBrand {
        status: Int,
        message: String,
        data: Brand
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