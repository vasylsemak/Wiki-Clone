const html = require("html-template-tag");

module.exports = (content) => html`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>WikiStack</title>
      <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet">
      <link href="/style.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/wiki">wikistack</a>
          </div>
          <div id="nav-items" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><a href="/wiki/">pages</a></li>
              <li><a href="/users">users</a></li>
              <li><a href="/wiki/add">WRITE</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container content">
        $${content}
      </div>
      <hr/>
      <div id="footer" class="container text-muted">
        WIKISTACK by Vasyl Semak
      </div>
    </body>
  </html>`;
