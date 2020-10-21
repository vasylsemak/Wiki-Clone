const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form class="form-horizontal" method="POST" action="/wiki/">

    <div class="form-group">
      <label class="col-sm-2 control-label" for="author">Author Name</label>
      <div class="col-sm-10">
        <input id="author" name="author" type="text" class="form-control"/>
      </div>
    </div>

    <div class="form-group">
      <label for="author-email" class="col-sm-2 control-label">Author e-mail</label>
      <div class="col-sm-10">
        <input id="author-email name="author-email" type="email" class="form-control" placeholder="Enter email"/>
      </div>
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>
    </div>

    <div class="form-group">
      <label for="paragraph" class="col-sm-2 control-label">Enter your text here: </label>
      <div class="col-sm-10">
        <textarea id="paragraph" name="paragraph" class="form-control" rows="4"></textarea>
      </div>
    </div>

    <div class="form-group">
      <label for="page-status" class="col-sm-2 control-label">Page Status</label>
      <div class="col-sm-10">
        <input id="page-status" name="page-status" type="text"/>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
