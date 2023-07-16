const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Image = db.define(
  'images',
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
)

module.exports = Image
