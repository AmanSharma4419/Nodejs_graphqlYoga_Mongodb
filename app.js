const { User, typeDefs, resolvers } = require("./models/users");
const { GraphQLServer } = require("graphql-yoga");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/UserApp");

const server = new GraphQLServer({ typeDefs, resolvers });

mongoose.connection.once("open", function () {
  server.start(() => console.log("Server is running on localhost:4000"));
});
