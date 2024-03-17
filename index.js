
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers');
const sequelize = require('./utils/database');
const book = require('./model/book'); // Import your models

const app = express();

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
