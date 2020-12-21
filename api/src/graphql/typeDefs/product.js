const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {        
        getAllProduct(input: InputGetProduct): [Product]!
    }
    extend type Mutation {
        createProduct(input: InputProduct): ResultProduct!
    }

    type Product {
        _id: ID,
        fname: String,
        ename: String,
        category: Category,
        brand: Brand,
        warranty: Warranty,
        seller: Seller,
    }

    type ResultProduct {
        status: Int,
        message: String,
        data: Product
    }  
    
    input InputProduct {
        fname: String,
        ename: String,
        category: ID!,
        brand: ID!,
        warranty: ID!,
        seller: ID!
    }

    input InputGetProduct{
        page: Int,
        limit: Int
    }
`;

module.exports = typeDefs