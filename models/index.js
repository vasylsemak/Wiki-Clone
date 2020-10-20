const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: Sequelize.TEXT,
  status: {
    type: Sequelize.STRING,
    isIn: [['open', 'closed']]
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isEmail: true,
      unique: true
    }
  }
})

module.exports = { Page, User, db };
