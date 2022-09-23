const Sequelize = require('sequelize');
const Board = require('./board');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database,config.username,config.password,config);

db.sequelize = sequelize;

db.Board = Board;

Board.init(sequelize);

Board.associate(db);


module.exports = db;