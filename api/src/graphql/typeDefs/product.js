const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {        
        getByProductId(productId: Int): Product,
        getByCategoryId(page: Int, limit: Int, categoryId: Int): [Product!]!,
    }
    extend type Mutation {
        createProduct(input: InputProduct): ResultProduct!,
        addProductAttribute(input: InputAddProductAttribute):Result,
        updateProductAttribute(input: InputUpdateProductAttribute):Result
    }

    type Product {
        _id: ID,
        fname: String,
        ename: String,
        category: Category,
        brand: Brand,
        attribute : [Attribute!]!,
        detail : [Detail!]!,
    }

    type Attribute {
        seller : Seller,
        warranty : Warranty,
        color : String,
        stock : Int,
        price : Int,
        discount : Int
    }

    type Detail {
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
        detail : [InputDetails!]!,
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
        limit: Int,
        categoryId: Int
    }

    input InputAddProductAttribute {
        productId : ID!,
        attribute: InputAttribute!
    }

    input InputUpdateProductAttribute {
        productId : ID!,
        attributeId : ID!,
        attribute: InputAttribute!
    }
`;

module.exports = typeDefs