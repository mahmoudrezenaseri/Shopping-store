const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllProductSpecs(input:InputGetBrand):[PSpecs!]
    }
    extend type Mutation {
        createProductSpecs(input: InputPSpecs): ResultPSpecs!
    }
    
    type PSpecs{
        _id: ID,
        name: String,
        label: String,
        category: Category
    }    
    
    type ResultPSpecs {
        status: Int,
        message: String,
        data: PSpecs
    }
   
    input InputPSpecs{
        name: String,
        label: String,
        category: ID
    }

`;

module.exports = typeDefs