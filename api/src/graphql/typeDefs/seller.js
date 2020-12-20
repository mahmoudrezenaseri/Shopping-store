const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getSellerByCategory(category: ID):[Seller!],
    }
    extend type Mutation {
        createSeller(input: InputSeller): ResultSeller!
    }
    
    type Seller{
        _id: ID,
        name: String,
        label: String,
        category: Category
    }    
    
    type ResultSeller {
        status: Int,
        message: String,
        data: Seller
    }
   
    input InputSeller{
        name: String,
        label: String,
        category: ID,
    }

    input InputGetSeller{
        page: Int,
        limit: Int
    }

`;

module.exports = typeDefs