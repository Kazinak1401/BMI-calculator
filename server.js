const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const bmiRoutes = require('./bmiRoutes.js');
app.use('/', bmiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
