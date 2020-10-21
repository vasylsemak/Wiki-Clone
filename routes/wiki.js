const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');
const wikiPage = require('../views/wikipage');

router.get('/', async (req, res, next) => {
  try {
    const data = await Page.findAll();
    res.status(200).send(data);
  } catch (error) { throw new Error(error) }
});

router.post('/', async (req, res, next) => {
  try {
    const newPage = await Page.create(req.body);
    res.redirect(`/wiki/${newPage.slug}`);
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
  res.send(wikiPage(currPage));
  } catch (error) { throw new Error(error) }
});


module.exports = router;
