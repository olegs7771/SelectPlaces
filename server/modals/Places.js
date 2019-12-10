const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlacesSchema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
mongoose.set('useCreateIndex', true);
module.exports = Places = mongoose.model('places', PlacesSchema);
