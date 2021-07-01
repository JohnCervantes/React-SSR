import { ApolloError, AuthenticationError } from "apollo-server-errors";
import animal from "../models/animal.js";
import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    animals: async (parent, args, context) => {
      if (!context.user) return null;
      try {
        const result = await animal.find({});
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    users: async (parent, args, context) => {
      try {
        const result = await user.find({});
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    user: async (parent, { email, password }, context) => {
      try {
        const result = await user.findOne({ email });
        const passwordCorrect =
          result === null
            ? false
            : await bcrypt.compare(password, result.passwordHash);
        if (!(result && passwordCorrect)) {
          throw new ApolloError(`Invalid email or password.`);
        } else {
          const userForToken = {
            username: result.email,
            id: result._id,
          };

          const token = jwt.sign(userForToken, process.env.SECRET);
          result.token = token;

          return result;
        }
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    addAnimal: async (parent, { name, age, color }, context) => {
      try {
        const result = await animal.create({ name, age, color });
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    createUser: async (
      parent,
      {
        passwordHash,
        email,
        firstName,
        lastName,
        phone,
        isAdmin,
        registerDate,
      },
      context
    ) => {
      try {
        const saltRounds = 10;
        const passwordHashed = bcrypt.hash(passwordHash, saltRounds);

        const result = await user.create({
          passwordHash: passwordHashed,
          email,
          firstName,
          lastName,
          phone,
          isAdmin,
          registerDate,
        });
        const userForToken = {
          email: result.email,
          id: result._id,
        };
        const token = jwt.sign(userForToken, process.env.SECRET, {
          expiresIn: "24h",
        });
        result.token = token;
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};

export default resolvers;
