const router = require('express').Router();
const {User, Page} = require('../models');
const userList = require('../views/userList');
const userPages = require('../views/userPages');

// Get All users
router.get('/', async (req, res) => {
  try {
    const data = await User.findAll();
    res.send(userList(data));
  } catch (error) {console.log(error)}
})

// Get One user
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages = await Page.findAll({
      where: {authorId: user.id}
    });
    res.send(userPages(user, pages));
  } catch (error) {console.log(error)}
})

module.exports = router;
