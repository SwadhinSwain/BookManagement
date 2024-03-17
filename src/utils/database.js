
const { Sequelize } = require('sequelize');

// Configure Sequelize to connect to your MySQL database
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  user: 'root',
  database: 'text',
  password: 'swadhin123',
  dialect: 'mysql',
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
