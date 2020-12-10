const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllCategory(input:InputGetCategory):[Category]

    }
    extend type Mutation {
        createCategory(input: InputCategory): Result!
    }

    input InputGetCategory{
        page: Int,
        limit: Int
    }

    input InputCategory{
        name: String,
        label: String,
        parent: ID,
        image: ID
    }

    type CategoryParent {
        _id: ID,
        name: String,
        label: String,
        parent: Category,
    }
`;

module.exports = typeDefs