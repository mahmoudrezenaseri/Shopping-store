const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {        
        getByAllProvince: [Province],
        getCities(provinceId: ID): [Province],
    }
    extend type Mutation {
        createProvince(input: InputProvince): ResultProvince!
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
        provinceId: ID!,
        fname: String!,
        ename: String,
        code: String,
        active: Boolean,
    }

    type ResultProvince {
        status: Int,
        message: String,
        data: Province
    }  
    
    input InputProvince {
        fname: String!,
        ename: String,
        code: String,
        city : [InputCity]
    }

    input InputCity {
        fname: String!,
        ename: String,
        code: String,
    }
`;

module.exports = typeDefs