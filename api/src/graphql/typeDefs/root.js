const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }
    
    type Result {
        status: Int,
        message: String
    }

    scalar Number
    scalar Date
`;

module.exports = typeDefs;
