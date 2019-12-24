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
const auth = require('./routes/auth');

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

//connect to mongoDB
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
//Public Folder
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/api', auth);

//Exercises
// const promise = new Promise((resolve,reject)=>{

// })
