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
        message: String,
        model: Category
    }

    type Files {
        name: String,
        dimWidth: String,
        dimHeight: String,
        format: String,
        dir: String,
        createdAt:Date
    }

    type Category {
        _id: ID,
        name: String,
        label: String,
        parent: CategoryParent,
        image: Files
    }
    
    type Brand{
        _id: ID,
        category: [Category],
        name: String,
        label: String,
        image: String,
    }

    scalar Number
    scalar Date
`;

module.exports = typeDefs;
