const router = require('express').Router();
const { Page } = require('../models');

router.get('/', async (req, res) => {
  try {
    const data = await Page.findAll();
    res.status(200).send(data);
  } catch (error) { throw new Error(error) }
});

router.post('/', async (req, res) => {
  try {
    const newPage = req.body;
    await Page.create(newPage);
    res.redirect('/wiki')
  } catch (error) { throw new Error(error) }
})
router.get('/add', async (req, res) => {
  res.send('<h1>Views/Add</h1>');
})


module.exports = router;
