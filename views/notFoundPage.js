const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () => layout(html`
  <h3>This page is does not exist. Please press the link below to go to the main page: </h3>
  <h2><a href="/wiki">Back to Homepage</a></h2>
`)
