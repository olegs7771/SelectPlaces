const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.set('useCreateIndex', true);
module.exports = Auth = mongoose.model('auth', AuthSchema);
