const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("src/graphql/typeDefs");
const resolvers = require("src/graphql/resolvers");

// Initalize the App
const app = express();

// Setting up the middlewares
app.disable("e-powered-by");

module.exports = class Application {
  constructor() {
    this.ServerConfig();
    this.DatabaseConfig();
  }

  // Starting Apollo-express-Server
  ServerConfig() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // playground: config.in_prod,
      formatError(err) {
        if (!err.originalError) {
          return err;
        }

        const data = err.originalError.data;
        const code = err.originalError.code || 500;
        const message = err.message || "error";

        return { data, status: code, message };
      }, context: async ({ req, res }) => {

        return {
          req, res
        };
      }
    });

    server.applyMiddleware({ app });

    app.listen(config.port, () => {
      console.log(`server run on port ${config.port}`);
    });

  }

  async DatabaseConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database.url, config.database.options);
  }
};
