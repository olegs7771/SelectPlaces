const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

const index = require('./routes/index');
const places = require('./routes/places');
//MongoDB
const db =
  'mongodb://olegs777:olegs777@ds125774.mlab.com:25774/select_places_react_native';
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connected to ${db}`))
  .catch(err => console.log(err));

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
//Routes
app.use('/', index);
app.use('/api', places);
