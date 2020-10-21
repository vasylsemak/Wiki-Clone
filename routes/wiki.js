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
    const { title, slug, content, status } = req.body;
    await Page.create({ title, slug, content, status });
    res.redirect('/wiki')
  } catch (error) { throw new Error(error) }
});

router.get('/add', (req, res, next) => {
  res.status(200).send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const currSlug = req.params.slug
    .replace(/\s+/g, '_')
    .replace(/\W/g, '')
    .toLowerCase();
  const currPage = await Page.findOne({
    where: { slug: currSlug }
  })
  res.send(currSlug);
  } catch (error) { throw new Error(error) }
});


module.exports = router;
