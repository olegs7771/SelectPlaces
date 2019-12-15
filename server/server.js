const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const index = require('./routes/index');
const places = require('./routes/places');

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

//Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//init express-fileupload
app.use(fileUpload());

//Routes
app.use('/', index);
app.use('/api', places);
