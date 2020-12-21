const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllSlider: [Slider!]!
    }
    extend type Mutation {
        createSlider(name: String, isDefault: Boolean, image: [ID!]!): ResultSlider!
    }

    type Slider {
        _id: ID,
        name: String,
        isDefault: Boolean,
        image: [ID!]!,
    }

    type ResultSlider {
        status: Int,
        message: String,
        data: Slider
    }   
`;

module.exports = typeDefs