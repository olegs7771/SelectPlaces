const express = require('express');
const router = express.Router();
const Places = require('../modals/Places');
const fs = require('fs-extra');
const mongodb = require('mongodb');
const path = require('path');
const moment = require('moment');

router.get('/getPlace', (req, res) => {
  Places.find().then(places => {
    if (places.length === 0) {
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
    req.files.sampleFile.name === ''
      ? 'image'
      : req.files.sampleFile.name +
        '-' +
        moment(Date.now()).format('DD-MM-YYYY') +
        '-' +
        Math.trunc(Math.random() * 10000000) +
        mime;

  sampleFile.mv('./public/images/' + fileName, err => {
    if (err) return res.status(500).send(err);

    //Write to DB
    const imgURI = 'http://10.0.2.2:3000/images/' + fileName;
    const newPlace = new Places({
      placeName: req.body.placeName,
      key: req.body.key,
      location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        latitudeDelta: req.body.latitudeDelta,
        longitudeDelta: req.body.longitudeDelta,
      },
      imgURI,
    })
      .save()
      .then(place => {
        if (!place) {
          return console.log('new place was not created!');
        }
        res.status(200).json({message: 'Place created!'});
      });
  });
});

//delete place
router.post('/delete', (req, res) => {
  console.log('req.body.id', req.body.id);
  // res.status(200).json({deleted: 'Place has been deleted'});
  Places.findOneAndDelete({_id: req.body.id}).then(place => {
    if (!place) {
      return res.status(200).json({deleted: 'Error to delete place'});
    }
    console.log('place to delete', place);
    //Check if file exists

    const filePathToDelete = place.imgURI.replace(
      'http://10.0.2.2:3000',
      './public',
    );
    console.log('filePathToDelete', filePathToDelete);
    fs.ensureFile(filePathToDelete)
      .then(() => {
        console.log('There is a file');
        //Remove File
        fs.unlink(filePathToDelete)
          .then(() => {
            console.log(`file ${place.placeName} was deleted`);
          })
          .catch(err => {
            console.log(`file ${place.placeName} was not deleted `, err);
          });
      })
      .catch(err => {
        console.log('err:', err);
      });

    res.status(200).json({deleted: 'Place has been deleted'});
  });
});

module.exports = router;
