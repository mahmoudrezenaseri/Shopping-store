const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getPSpecDetailsByPSpec(specs:ID!):[PSpecDetails!]!
    }
    extend type Mutation {
        createProductSpecDetails(input: InputPSpecDetails): ResultPSpecDetails!
    }
    
    type PSpecDetails {
        _id: ID,
        name: String,
        label: String,
        specs: PSpecs
    }
    
    type ResultPSpecDetails {
        status: Int,
        message: String,
        data: PSpecDetails
    }
   
    input InputPSpecDetails {
        name: String,
        label: String,
        specs: ID
    }

`;

module.exports = typeDefs