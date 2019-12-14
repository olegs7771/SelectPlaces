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

//MongoDB URI
// const mongoURI =
//   'mongodb://olegs777:olegs777@ds125774.mlab.com:25774/select_places_react_native';
//MongoDB connection

// const conn = mongoose
//   .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(() => console.log(`connected to ${mongoURI}`));

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
