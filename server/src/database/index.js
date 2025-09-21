// const { Sequelize } = require("sequelize");
// const configFile = require("../config/index.js");
// let models = require("../models/index.js");
// const { parse } = require("pg-connection-string"); // npm install pg-connection-string

// require("dotenv").config();

// const env = process.env.NODE_ENV || "development";
// let config = configFile[env];

// // Dynamically override config if DATABASE_URL is present
// if (process.env.DATABASE_URL) {
//   const parsed = parse(process.env.DATABASE_URL);

//   config = {
//     ...config,
//     host: parsed.host,
//     port: parsed.port || 5432,
//     username: parsed.user,
//     password: parsed.password,
//     database: parsed.database,
//     use_env_variable: process.env.DATABASE_URL,
//   };
// }

// // Choose how to instantiate Sequelize
// let sequelize;
// if (config.use_env_variable) {
//   // Use DATABASE_URL
//   sequelize = new Sequelize(config.use_env_variable, config);
// } else {
//   // Use config credentials
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// // Load models
// models = models.db;
// const db = {
//   models: models(sequelize),
//   sequelize,
// };

// // Export
// exports.db = db;
// exports.sequelize = sequelize;

require("dotenv").config();
const { Sequelize } = require("sequelize");
const configFile = require("../config/index.js");
let models = require("../models/index.js");

// Set environment
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// Create Sequelize instance using env-based config
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: config.pool,
    logging: false, // optional: disable SQL logging
  }
);

// Load models
models = models.db;
const db = {
  models: models(sequelize),
  sequelize,
};

// Export
exports.db = db;
exports.sequelize = sequelize;
