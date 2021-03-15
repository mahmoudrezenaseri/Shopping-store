const { gql } = require("apollo-server-express");

const typeDefs = gql`
    extend type Query {
        getAllCategoryWithPagination(input:InputGetCategory):CategoryInfo,
        getAllCategory:[Category],
        getAllCategoryTreeView:[CategoryHierarchy]
    }
    extend type Mutation {
        createCategory(input: InputCategory): ResultCategory!
    }    

    type Category {
        _id: ID,
        name: String,
        label: String,
        parent: CategoryParent,
        image: Files,
        createdAt: String!,
        updatedAt: String!
    }      

    type CategoryChildren {
        _id: ID,
        name: String,
        parent: ID,
        level:Int
    }  

    type CategoryInfo{
        totalDocs : Int,
        hasNextPage: Boolean,
        page: Int,
        categories: [Category]
      }

    type CategoryHierarchy {
        _id: ID,
        name: String,
        children:[CategoryChildren]
    }

    type ResultCategory {
        status: Int,
        message: String,
        data: Category
    }

    input InputGetCategory{
        page: Int,
        limit: Int,
        searchText: String
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