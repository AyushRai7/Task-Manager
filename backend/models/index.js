const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/task_manager');

const db = {};
db.sequelize = sequelize;
db.User = require('./user')(sequelize);
db.Task = require('./task')(sequelize);
db.Task.belongsTo(db.User);
db.User.hasMany(db.Task);

module.exports = db;