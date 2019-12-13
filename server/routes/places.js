const express = require('express');
const router = express.Router();
const Places = require('../modals/Places');
const mongodb = require('mongodb');
const binary = mongodb.Binary;

router.get('/getPlace', (req, res) => {
  res.render('index.html');
});

//create new place
router.post('/create_place', (req, res) => {
  console.log('req.body', req.body);

  const newPlace = new Places({
    name: req.body.name,
    image: req.body.image,
    location: req.body.location,
  })
    .save()
    .then(place => {
      res.status(200).json(place);
    });
});

router.post('/upload', (req, res) => {
  console.log('req.body', req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(200).json({msg: 'No files were uploaded.'});
  }
  res.status(200).json({msg: 'Success'});
  let sampleFile = req.files.sampleFile;
  console.log('req.files', req.files);
  console.log('sampleFile ', sampleFile);
  console.log('req.files', req.files);
  // console.log('req.files.data', req.files.data);

  // let file = {name: req.body.name, file: binary(req.files.uploadedFile.data)};
  // console.log('file', file);
});

module.exports = router;
