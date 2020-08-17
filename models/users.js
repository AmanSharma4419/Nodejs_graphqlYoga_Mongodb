const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  designation: String,
});

const typeDefs = `type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }
  type User {
      id: ID!
      name: String,
      email: String,
      password: String,
      designation: String,
  }
  type Mutation {
      addUser(name: String!, email: String!, password: String!, designation: String!): User!,
      deleteUser(id: ID!): String
      
  }`;
const resolvers = {
  Query: {
    getUsers: async () => {
      var result = await User.find()
        .sort({ _id: -1 })
        .exec()
        .then((user) => {
          return user;
        })
        .catch((err) => {
          return err;
        });
      return result;
    },
    getUser: async (_, { id }) => {
      var result = await User.findById(id)
        .exec()
        .then((user) => {
          return user;
        })
        .catch((err) => {
          return err;
        });
      return result;
    },
  },
  Mutation: {
    addUser: async (_, { name, email, password, designation }) => {
      const user = await new User({ name, email, password, designation });
      user.save((err, user) => {
        if (err) return err;
      });
      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndRemove(id)
        .exec()
        .then((user) => {
          return user;
        })
        .catch((err) => {
          return err;
        });
      return `${user} deleted with id ${id}`;
    },
  },
};

module.exports = { User, typeDefs, resolvers };
