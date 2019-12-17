const express = require('express');
const router = express.Router();
const Places = require('../modals/Places');
const fs = require('fs-extra');
const mongodb = require('mongodb');
const binary = mongodb.Binary;

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

  sampleFile.mv(
    './public/images/' + req.files.sampleFile.name + '.jpeg',
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
