const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');
const wikiPage = require('../views/wikipage');
const allPages = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const data = await Page.findAll();
    console.log("data ----->", data);

    res.send(allPages(data));
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
