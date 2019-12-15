const express = require('express');
const router = express.Router();
const Places = require('../modals/Places');
const mongodb = require('mongodb');
const binary = mongodb.Binary;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url =
  'mongodb://olegs777:olegs777@ds125774.mlab.com:25774/select_places_react_native';

const dbName = 'select_places_react_native';

router.get('/getPlace', (req, res) => {
  MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('places');
    collection.find().toArray((err, places) => {
      assert.equal(err, null);
      res.status(200).json(places);
      console.log('places', places);
      client.close();
    });
  });
});

//create new place

router.post('/upload', (req, res) => {
  if (Object.keys(req.body) === 0) {
    return console.log('no data to save!');
  } else {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      assert.equal(null, err);
      const db = client.db(dbName);
      const collection = db.collection('places');
      collection.insertMany(
        [
          {
            name: req.body.name,
            key: req.body.key,
            location: {
              latitude: Number(req.body.latitude),
              longitude: Number(req.body.longitude),
              latitudeDelta: Number(req.body.latitudeDelta),
              longitudeDelta: Number(req.body.longitudeDelta),
            },
            img: {
              data: req.body.sampleFile,
              contentType: req.body.contentType,
            },
          },
        ],
        (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log('Create one place seccessfully');
        },
      );
      client.close();
    });
  }
});

module.exports = router;
