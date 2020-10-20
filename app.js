const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello!!!</h1>');
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`)
})
