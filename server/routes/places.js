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

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
  assert.equal(null, err);

  console.log('Connected correctly to server');

  const db = client.db(dbName);
  // insertDocuments(db, () => {
  //   findDocuments(db, () => {
  //     client.close();
  //   });
  // });
});

// const insertDocuments = (db, callback) => {
//   // Get the documents collection
//   // const collection = db.collection('places');
//   // Insert some documents
//   collection.insertMany(
//     [
//       {
//         name: 'test name',
//         key: 'some key',
//         location: {
//           latitude: 37.397874498418034,
//           longitude: -122.03535798937082,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         },
//         img: {
//           data: 'some data',
//           contentType: 'some contentType',
//           date: Date.now(),
//         },
//       },
//     ],
//     (err, result) => {
//       assert.equal(err, null);
//       assert.equal(1, result.result.n);
//       assert.equal(1, result.ops.length);
//       console.log('Inserted 1 documents into the collection');
//       callback(result);
//     },
//   );
// };
// const findDocuments = (db, callback) => {
//   // Get the documents collection
//   // const collection = db.collection('places');
//   // Find some documents
//   collection.find().toArray((err, docs) => {
//     assert.equal(err, null);
//     console.log('Found the following records');
//     console.log(docs);
//     callback(docs);
//   });
// };

router.get('/getPlace', (req, res) => {
  // Places.find().then(places => {
  //   if (!places.length > 0) {
  //     return res.status(200).json({msg: 'No place to show'});
  //   }
  //   res.status(200).json(places);
  //   places.forEach(place => {
  //     console.log('place', place);
  //   });
  // });
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('places');
    collection.find().toArray((err, places) => {
      assert.equal(err, null);
      res.status(200).json(places);
      console.log('places', places);
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
