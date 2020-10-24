const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () => layout(html`
  <div id="notfound">
  <div class="notfound">
    <div class="notfound-404">
      <h1>Oops!</h1>
    </div>
    <h2>404 - Page not found</h2>
    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
    <a href="/wiki">Go To Homepage</a>
  </div>
  </div>
`)

  // <h3>This page is does not exist. Please press the link below to go to the main page: </h3>
  // <h2><a href="/wiki">Back to Homepage</a></h2>
