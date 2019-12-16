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

  if (Object.keys(req.body) === 0) {
    return console.log('no data to save!');
  } else {
    //Write File to /public/images
    const dataBinary = binary(req.body.sampleFile);
    fs.writeFile(
      `./public/images/` + Date.now() + req.body.name + `.jpg`,
      dataBinary,
    )
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });

    const newPlace = new Places({
      name: req.body.name,
      key: req.body.key,
      location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        latitudeDelta: req.body.latitudeDelta,
        longitudeDelta: req.body.longitudeDelta,
      },
      // img: {
      //   data: binaryData,
      //   contentType: req.body.contentType,
      // },
    })
      .save()
      .then(place => {
        console.log('New place was created');

        console.log('saved place', place);
      });
  }
});

fs.readFile('./public/images/reactjs-1566440005648-958.jpg').then(file => {
  console.log('file', file);
});

module.exports = router;
