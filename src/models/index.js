const { Sequelize } = require('sequelize');

// Initialize Sequelize with the DATABASE_URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging for cleaner output
});

// Import models
const Subscription = require('./subscription')(sequelize);

// Export sequelize instance and models
module.exports = {
  sequelize,
  Subscription,
};
