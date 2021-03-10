const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllCategory(input:InputGetCategory):[Category],
        getAllCategoryTreeView:[CategoryHierarchy]
    }
    extend type Mutation {
        createCategory(input: InputCategory): ResultCategory!
    }    

    type Category {
        _id: ID,
        name: String,
        label: String,
        parent: ID,
        image: Files,
        level:Int
    }  

    type CategoryHierarchy {
        _id: ID,
        name: String,
        children:[Category]
    }

    type ResultCategory {
        status: Int,
        message: String,
        data: Category
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