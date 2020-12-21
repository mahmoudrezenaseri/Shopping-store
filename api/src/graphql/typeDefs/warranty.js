const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllWarranty(input:InputGetWarranty):[Warranty!]
    }
    extend type Mutation {
        createWarranty(name: String, label: String): ResultWarranty!
    }
    
    type Warranty{
        _id: ID,
        name: String,
        label: String
    }    
    
    type ResultWarranty {
        status: Int,
        message: String,
        data: Warranty
    }

    input InputGetWarranty{
        page: Int,
        limit: Int
    }

`;

module.exports = typeDefs