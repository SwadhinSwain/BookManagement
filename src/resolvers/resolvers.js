
const books = []; // Array to store books temporarily
const users = []; // Array to store users temporarily
const { generateToken, hashPassword, comparePasswords, SECRET_KEY } = require('../utils/auth');
const User = require('../models/User'); // Assuming you have a User model

const resolvers = {
  Query: {
    books: () => books,
    users: () => users,
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBook = {
        id: String(books.length + 1),
        title: args.title,
        author: args.author,
        ownerId: args.ownerId,
      };
      books.push(newBook);
      return newBook;
    },

    registerUser: async (_, { username, email, password }) => {
        try {
          const hashedPassword = await hashPassword(password);
          const newUser = await User.create({ username, email, password: hashedPassword });
          const token = generateToken(newUser);
          return { token };
        } catch (error) {
          throw new Error('Registration failed');
        }
      },
      loginUser: async (_, { email, password }) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            throw new Error('User not found');
          }
          const validPassword = await comparePasswords(password, user.password);
          if (!validPassword) {
            throw new Error('Invalid password');
          }
          const token = generateToken(user);
          return { token };
        } catch (error) {
          throw new Error('Login failed');
        }
      }
    // Implement other mutation resolvers for CRUD operations
  },
  Book: {
    owner: (parent) => {
      // Assuming you have a function to fetch user by ID
      return users.find(user => user.id === parent.ownerId);
    },
  },
};

module.exports = resolvers;
