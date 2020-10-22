const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}?_method=PUT">

  <div class="form-group">
    <label class="col-sm-2 control-label" for="author">Author Name</label>
    <div class="col-sm-10">
      <input id="author" name="author" type="text" class="form-control"/>
    </div>
  </div>

  <div class="form-group">
    <label for="email" class="col-sm-2 control-label">Author e-mail</label>
    <div class="col-sm-10">
      <input id="email" name="email" type="email" class="form-control" placeholder="Enter email"/>
    </div>
  </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input name="title" type="text" class="form-control" value="${page.title}"/>
      </div>
    </div>

    <div class="form-group">
      <label for="email" class="col-sm-2 control-label">Author e-mail</label>
      <div class="col-sm-10">
        <input id="email" name="email" type="email" class="form-control" placeholder="Enter email"/>
      </div>
    </div>

    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == "open" ? "selected" : ""}>open</option>
          <option ${page.status == "closed" ? "selected" : ""}>closed</option>
        </select>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
`);
