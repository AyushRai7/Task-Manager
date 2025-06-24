require('dotenv').config(); 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL || 'postgres://postgres:root@localhost:5432/task_manager', {
  dialect: 'postgres',
  dialectOptions: process.env.DB_URL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

const db = {};
db.sequelize = sequelize;
db.User = require('./user')(sequelize);
db.Task = require('./task')(sequelize);
db.Task.belongsTo(db.User);
db.User.hasMany(db.Task);

module.exports = db;
