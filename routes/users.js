const router = require('express').Router();
const { User, Page } = require('../models');
const userList = require('../views/userList');
const userPages = require('../views/userPages');

// Get All users
router.get('/', async (req, res, next) => {
  try {
    const data = await User.findAll();
    res.send(userList(data));
  } catch (error) { next(error) }
})

// Get One user
router.get('/:id', async (req, res, next) => {
  try {
    // const user = await User.findByPk(req.params.id);
    // const pages = await Page.findAll({      ---> MAGIC METHOD
    //   where: { authorId: user.id }
    // });

    const { name, pages } = await User.findByPk(req.params.id, {
      include: [{ model: Page }]         //    ---> EAGER LOADING
    });

    res.send(userPages(name, pages));
  } catch (error) { next(error) }
})

module.exports = router;
