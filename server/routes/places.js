const express = require('express');
const router = express.Router();
const Places = require('../modals/Places');
const fs = require('fs-extra');
const mongodb = require('mongodb');
const path = require('path');
const moment = require('moment');

router.get('/getPlace', (req, res) => {
  Places.find().then(places => {
    if (!places.length > 0) {
      return res.status(200).json({message: 'No place to show'});
    }
    res.status(200).json(places);
  });
});

//create new place

router.post('/upload', (req, res) => {
  console.log('req.body', req.body);
  console.log('req.files', req.files);
  let sampleFile = req.files.sampleFile;
  console.log('req.files.sampleFile.mimetype', req.files.sampleFile.mimetype);

  //check for mimetype
  const filetypes = /jpeg|jpg|gif/;
  const mimetype = filetypes.test(req.files.sampleFile.mimetype);
  console.log('mimetype', mimetype);
  if (!mimetype) {
    return res.status(400).json({error: 'Wrong format!'});
  }
  const mime = req.files.sampleFile.mimetype.replace('image/', '.');
  const fileName =
    req.files.sampleFile.name === '' ? 'image' : req.files.sampleFile.name;
  sampleFile.mv(
    './public/images/' +
      fileName +
      '-' +
      moment(Date.now()).format('DD-MM-YYYY') +
      '-' +
      Math.trunc(Math.random() * 10000000) +
      mime,
    function(err) {
      if (err) return res.status(500).send(err);

      res.send('File uploaded!');
    },
  );
  // Write File to /public/images
  // const newPlace = new Places({
  //   name: req.body.name,
  //   key: req.body.key,
  //   location: {
  //     latitude: req.body.latitude,
  //     longitude: req.body.longitude,
  //     latitudeDelta: req.body.latitudeDelta,
  //     longitudeDelta: req.body.longitudeDelta,
  //   },
  //   // img: {
  //   //   data: binaryData,
  //   //   contentType: req.body.contentType,
  //   // },
  // })
  //   .save()
  //   .then(place => {
  //     console.log('New place was created');
  //     console.log('saved place', place);
  //   });
});

// fs.readFile('./public/images/20191021_153059.jpg').then(file => {
//   console.log('file', file);
// });

module.exports = router;
