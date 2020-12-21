const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllBanner: [Banner!]!
    }
    extend type Mutation {
        createBanner(isDefault: Boolean, category: ID!, image: ID!): ResultBanner!
    }

    type Banner {
        _id: ID,
        isDefault: Boolean,
        image: ID!,
        category: ID!,
    }

    type ResultBanner {
        status: Int,
        message: String,
        data: Banner
    }   
`;

module.exports = typeDefs