'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';              //add node_env?
const config    = require(__dirname + '/../config/config.js')[env];
let db        = {};
const associations = require('../config/associations');

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);  //add variable?
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, {dialect: 'postgres'});
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate().then(
  () => console.log('connected to PG'),
  (err) => console.log('error', err)
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations
associations(db.sequelize)
// db.sequelize.model('member_purchase').sync({force:true})

db.sequelize.sync();

module.exports = db;
