const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Task', {
    title: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: 'To Do' },
  });
};