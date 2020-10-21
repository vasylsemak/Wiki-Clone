const router = require('express').Router();
const addPage = require('../views/addPage');
const {Page, User} = require('../models');
const wikiPage = require('../views/wikipage');
const allPages = require('../views/main');

// Get All pages
router.get('/', async (req, res, next) => {
  try {
    const data = await Page.findAll();
    res.send(allPages(data));
  } catch (error) {throw new Error(error)}
});

// Post to All pages
router.post('/', async (req, res, next) => {
  try {
    const {author, email, title, content, status} = req.body;
    const [user] = await User.findOrCreate({
      where: {
        name: author,
        email: email
      }
    });
    const newPage = await Page.create({title, content, status});
    await newPage.setAuthor(user); // Association between User and Page.

    console.log('magic methods-->', Object.keys(Page.prototype));
    res.redirect(`/wiki/${newPage.slug}`);
  } catch (error) {throw new Error(error)}
});

// Get Add page
router.get('/add', (req, res, next) => {
  res.status(200).send(addPage());
});

// Get One page
router.get('/:slug', async (req, res, next) => {
  try {
    const currSlug = req.params.slug
      .replace(/\s+/g, '_')
      .replace(/\W/g, '')
      .toLowerCase();

  const currPage = await Page.findOne({
    where: {slug: currSlug}
  })

  res.send(wikiPage(currPage));
  } catch (error) {throw new Error(error)}
});


module.exports = router;
