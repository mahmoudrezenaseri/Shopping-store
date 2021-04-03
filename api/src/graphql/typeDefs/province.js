const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {        
        getAllProvince: [Province],
        getCities(provinceId: ID): [Province],
    }
    extend type Mutation {
        createProvince(input: InputProvince): ResultProvince!
        createCity(input: InputCity): ResultCity!
    }

    type Province {
        _id: ID,
        fname: String!,
        ename: String,
        code: String,
        active: Boolean,
        city : [City],
    }

    type City {
        _id: ID,
        fname: String!,
        ename: String,
        code: String,
        active: Boolean,
        provinceId: ID
    }

    type ResultProvince {
        status: Int,
        message: String,
        data: Province
    }  

    type ResultCity {
        status: Int,
        message: String,
        data: City
    }  
    
    input InputProvince {
        fname: String!,
        ename: String,
        code: String,
        active: Boolean,
        city : [InputCity]
    }

    input InputCity {
        provinceId: ID!,
        fname: String!,
        ename: String,
        code: String,
        active: Boolean,
    }
`;

module.exports = typeDefs