const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { db, Page, User } = require('./models');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1 class="h111">Hello!!!</h1>`);
})


// Verify db connection
db.authenticate().then(() => { console.log('connected to the database') });

const init = async () => {
  await db.sync(); // db.sync({force: true}) - to drop and recreate tables data
  app.listen(3000, () => {
    console.log(`Server is listening on port 3000!`);
  });
}

init();
