const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlacesSchema = new Schema({
  placeName: {
    type: String,
  },
  key: {
    type: String,
  },
  imgURI: {
    type: String,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    latitudeDelta: {
      type: Number,
    },
    longitudeDelta: {
      type: Number,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
mongoose.set('useCreateIndex', true);
module.exports = Places = mongoose.model('places', PlacesSchema);
