const router = require('express').Router();
const addPage = require('../views/addPage');
const {Page, User} = require('../models');
const wikiPage = require('../views/wikipage');
const allPages = require('../views/main');
const edirPage = require('../views/editPage');


// Service f-n to refactor slug url
const cleanSlag = s => s.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();

// Get All pages
router.get('/', async (req, res, next) => {
  try {
    const data = await Page.findAll();
    res.send(allPages(data));
  } catch (error) {throw new Error(error)}
});

// Post to All pages
router.post('/', async (req, res) => {
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
router.get('/add', (req, res) => {
  res.status(200).send(addPage());
});

// Get One page
router.get('/:slug', async (req, res) => {
  try {
    const currSlug = cleanSlag(req.params.slug);
    const page = await Page.findOne({where: {slug: currSlug}});

    if(page === null) res.sendStatus(404);
    else {
      const {name} = await page.getAuthor();  // Magic Method created through association
      res.send(wikiPage(page, name));
    }
  } catch (error) {throw new Error(error)}
});

// GET Edit One page
router.get('./:slug/edit', async (req, res) => {
  try {
    const currSlug = cleanSlug(req.params.slug);
    const page = await Page.findOne({where: {slug: currSlug}});

    if(page === null) res.sendStatus(404);
    else {
      const {name} = await page.getAuthor();
      res.send(editPage(page, name));
    }
  } catch (error) {throw new Error(error)}
})


module.exports = router;
