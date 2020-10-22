const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>${page.title}
      <small> (<a href="/wiki/${page.slug}/similar">Similar</a>)</small>
  </h3>
  <h4>by <a href="/users/${page.authorId}">${author}</a></h4>
  <hr/>
  <div class="page-body">${page.content}</div>
  <hr/>
  <a href="/wiki/${page.slug}/edit" class="btn btn-primary btn-wikipage">edit this page</a>
  <form style="display:inline" method="POST" action="/wiki/${page.slug}?_method=DELETE">
    <button class="btn btn-danger btn-wikipage">delete this page</button>
  </form>
`);
