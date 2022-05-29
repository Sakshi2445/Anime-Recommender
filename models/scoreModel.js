const mongoose = require('mongoose');

//Creating schema for our New Database
const schema = new mongoose.Schema({
  uid: {
    type: Number,
  },
  score: {
    type: Array,
  },
});

//exporting the model created for it
const data = mongoose.model('score_datas', schema);
module.exports = data;
