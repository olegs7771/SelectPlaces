const express = require('express');
const router = express.Router();
const Places = require('../modals/Places');
const mongodb = require('mongodb');
const binary = mongodb.Binary;

router.get('/getPlace', (req, res) => {
  Places.find().then(places => {
    if (!places.length > 0) {
      return res.status(200).json({msg: 'No place to show'});
    }
    res.status(200).json(places);
  });
});

//create new place

router.post('/upload', (req, res) => {
  console.log('req.body', req.body);
<<<<<<< HEAD

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(200).json({msg: 'No files were uploaded.'});
  }
  res.status(200).json({msg: 'Success'});
  let sampleFile = req.files.sampleFile;
  console.log('req.files', req.files);
  console.log('sampleFile ', sampleFile);
  console.log('req.files', req.files);
  // console.log('req.files.data', req.files.data);
=======
>>>>>>> 240032fecb623ce604f07e8a649df911615ac0c2

  const file = {name: req.body.name, file: binary(req.body.sampleFile)};
  console.log('file', file);
  if (Object.keys(file) === 0) {
    return console.log('no data to save!');
  } else {
    const newPlace = new Places({
      name: req.body.name,
      key: req.body.key,
      location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        latitudeDelta: req.body.latitudeDelta,
        longitudeDelta: req.body.longitudeDelta,
      },
      file: file.file,
    })
      .save()
      .then(place => {
        console.log('saved place', place);
      });
  }
});

module.exports = router;
