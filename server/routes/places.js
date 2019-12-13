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
    places.forEach(place => {
      console.log('place', place);
    });
  });
});

//create new place

router.post('/upload', (req, res) => {
  console.log('req.body', req.body);
  const binaryData = ('binary', binary(req.body.sampleFile));
  console.log('binaryData', binaryData);

  if (Object.keys(req.body) === 0) {
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
      img: {
        data: binaryData,
        contentType: req.body.contentType,
      },
    })
      .save()
      .then(place => {
        console.log('saved place', place);
      });
  }
});

module.exports = router;
