const router = require('express').Router();
const { Page, User } = require('../models');
const { main, addPage, editPage, wikiPage } = require("../views");
const cleanSlug = require('../functions');


// ALL Pages
// GET All pages
router.get('/', async (req, res, next) => {
  try {
    const data = await Page.findAll();
    res.send(main(data));
  } catch (error) { next(error) }
});

// Post to All pages
router.post('/', async (req, res, next) => {
  try {
    const { author, email, title, content, status } = req.body;
    const [ user ] = await User.findOrCreate({
      where: {
        name: author,
        email: email
      }
    });
    const newPage = await Page.create({ title, content, status });
    await newPage.setAuthor(user); // Association between User and Page.

    console.log('magic methods-->', Object.keys(Page.prototype));
    res.redirect(`/wiki/${newPage.slug}`);
  } catch (error) { next(error) }
});

// GET Add page
router.get('/add', (req, res) => {
  res.status(200).send(addPage());
});


// ONE Page by Slug
// GET One page
router.get('/:slug', async (req, res, next) => {
  try {
    const currSlug = cleanSlug(req.params.slug);
    const page = await Page.findOne({ where: { slug: currSlug } });

    if(page === null) res.sendStatus(404);
    else {
      const { name } = await page.getAuthor();  // Magic Method created through association
      res.send(wikiPage(page, name));
    }
  } catch (error) { next(error) }
});

// PUT Edit One page
router.put('/:slug', async (req, res, next) => {
  try {
    const currSlug = cleanSlug(req.params.slug);
    const [ updatedRowCount, updatedPages ] = await Page.update(req.body, {
      where: {
        slug: currSlug
      },
      returning: true
    });
    res.redirect('/wiki/' + updatedPages[0].slug);
  } catch (error) { next(error) }
})

// DELETE One page
router.delete('/:slug', async (req, res, next) => {
  try {
    const currSlug = cleanSlug(req.params.slug);
    const page = await Page.findOne({ where: { slug: currSlug } });

    if(page === null) res.sendStatus(404);
    else {
      const {id} = await page.getAuthor();
      await page.destroy();
      const pageAuthor = await User.findOne({ where: { id: id } });

      if(pageAuthor !== null) await pageAuthor.destroy();
      res.redirect('/wiki');
    }
  } catch (error) { next(error) }
});

// GET Edit One page
router.get('/:slug/edit', async (req, res, next) => {
  try {
    const currSlug = cleanSlug(req.params.slug);
    const page = await Page.findOne({ where: { slug: currSlug } });

    if(page === null) res.sendStatus(404);
    else {
      const { name, email } = await page.getAuthor();
      res.send(editPage(page, { name, email }));
    }
  } catch (error) { next(error) }
})

module.exports = router;
