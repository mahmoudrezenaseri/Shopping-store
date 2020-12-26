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
        attribute : [Attribute!]!,
        details : [Details!]!,
    }

    type Attribute {
        seller : Seller,
        warranty : Warranty,
        color : String,
        stock : Int,
        price : Int,
        discount : Int
    }

    type Details {
        specDetail : ID!,
        value : String!
        label : String
    }

    type ResultProduct {
        status: Int,
        message: String,
        data: Product
    }  
    
    input InputProduct {
        fname: String,
        ename: String!,
        description: String,
        category: ID!,
        brand: ID!,
        original : Upload,
        attribute : [InputAttribute!]!,
        details : [InputDetails!]!,
        image : [ID!]!,
    }

    input InputAttribute {
        seller : ID!,
        warranty : ID!,
        color : String!,
        stock : String!,
        price : String!,
        discount : String 
    }

    input InputDetails {
        specDetail : ID!,
        value : String!
        label : String
    }

    input InputGetProduct{
        page: Int,
        limit: Int
    }
`;

module.exports = typeDefs