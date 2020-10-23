const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false   // prevents output of SQL commands to console
});
const cleanSlug = require('../functions');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: {
        args: [[ 'open', 'closed' ]],
        msg: 'Must be open or closed!'
      }
    }
  }
});

Page.beforeValidate(page => {
  if(!page.slug) page.slug = cleanSlug(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  }
});


Page.belongsTo(User, { as: 'author' });

module.exports = { Page, User, db };
