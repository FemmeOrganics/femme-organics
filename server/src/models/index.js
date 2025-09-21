const fs = require('fs');
const path = require('path');
const Sequelize = require("sequelize");
require("dotenv").config();

const models = (sequelize) => {
  const db = {};

  // Read all files in the current directory, filtering out index.js and non-JS files
  const files = fs.readdirSync(__dirname).filter(file => {
    return file !== 'index.js' && file.endsWith('.js');
  });

  // Loop through each file, require it, and add the model to the db object
  files.forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

  // If any model has an associate method, call it to set up relationships
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

if (exports) {
  exports.db = models;
}
