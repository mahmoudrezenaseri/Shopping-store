const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        login(mobile:String!, password:String!): Auth!,
        refreshToken: Auth!
    }
    extend type Mutation {
        register(firstName: String!, lastName: String!, mobile: String!, password: String!): Auth!,
    }

    type User {
        _id:ID!,
        firstName: String!,
        lastName: String!,
        mobile: String!,
        password: String!,
        level: Number!,
        createdAt: String!,
        updatedAt: String!
    }

    type Auth {
        user: User,
        token: String!,
        refreshToken: String!
    }

`;

module.exports = typeDefs