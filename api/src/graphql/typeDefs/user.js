const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        login(mobile:String!, password:String!): Auth!,
        refreshToken: Auth!,
        getAllUserWithPagination(input: InputGetUser): AllUserInfo,
        filterUser(input: InputFilterUser): AllUserInfo
    }
    extend type Mutation {
        register(firstName: String!, lastName: String!, mobile: String!, email: String!, password: String!): Auth!,
    }

    type User {
        _id:ID!,
        firstName: String!,
        lastName: String!,
        mobile: String!,
        email: String,
        password: String!,
        level: Number!,
        createdAt: Date!,
        updatedAt: Date,
        fullName: String
    }

    type Auth {
        user: User,
        token: String!,
        refreshToken: String!
    }
    
    input InputGetUser{
        page: Int,
        limit: Int,
        searchText: String
    }
    
    input InputFilterUser{               
        page: Int,
        limit: Int,
        firstName: String,
        lastName: String,
        mobile: String,
        email: String,
        dateFrom: Date,
        dateTo: Date
    }
    
    type AllUserInfo{
        totalDocs : Int,
        hasNextPage: Boolean,
        page: Int,
        users: [User]
      }

`;

module.exports = typeDefs