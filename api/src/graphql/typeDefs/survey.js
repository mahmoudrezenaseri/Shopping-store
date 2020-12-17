const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getSurveyByCategoryId(categoryId: ID!): [Survey!]!
    }
    extend type Mutation {
        createSurvey(input: InputSurvey): ResultSurvey!
    }

    type Survey{
        _id: ID,
        name: String,
        label: String,
        category: Category,
    }

    type ResultSurvey {
        status: Int,
        message: String,
        data: [Survey!]
    }
   
    input InputGetSurvey{
        name: String,
        label: String,
        category: ID
    }

    input InputSurvey{
        list: [InputSurveyList!]!
    }

    input InputSurveyList{
        name: String!,
        label: String,
        category: ID!,
    }    

`;

module.exports = typeDefs