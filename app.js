const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const { db } = require('./models');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/wiki', require('./routes/wiki'));
app.use('./users', require('./routes/users'));
app.use('*', (req, res) => {
  res.send('Please type /wiki to see wikipedia!')
});

// Verify db connection
db.authenticate().then(() => { console.log('connected to the database') });

const init = async () => {
  await db.sync(); // db.sync({force: true}) - to drop and recreate tables data
  app.listen(3000, () => {
    console.log(`Server is listening on port 3000!`);
  });
}

init();
