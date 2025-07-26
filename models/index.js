const sequelize = require('../config/db');
const User = require('./user');
const Blog = require('./blog');

// Associations here — avoid circular imports
User.hasMany(Blog, {
  foreignKey: {
    name: 'authorId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: {
    name: 'authorId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

// Sync all models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // or { alter: true } if you want to preserve data
    console.log('Database synced successfully');
  } catch (err) {
    console.error('DB Sync Error:', err);
  }
};

module.exports = {
  sequelize,
  User,
  Blog,
  syncDatabase,
};
