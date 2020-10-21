const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const data = await Page.findAll();
    res.status(200).send(data);
  } catch (error) { throw new Error(error) }
});

router.post('/', async (req, res, next) => {
  try {
    const newPage = req.body;
    await Page.create(newPage);
    res.redirect('/wiki')
  } catch (error) { throw new Error(error) }
})
router.get('/add', (req, res, next) => {
  res.status(200).send(addPage());
})


module.exports = router;
