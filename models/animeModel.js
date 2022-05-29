const mongoose = require('mongoose');

//Creating schema of our Database
const UserSchema = new mongoose.Schema(
  {
    uid: String,
    title: String,
    synopsis: String,
    genre: String,
    aired: String,
    img_url: String,
    link: String,
    episodes: Number,
    members: Number,
    popularity: Number,
    ranked: Number,
    score: Number,
  },
  {
    collection: 'anime',
  }
);

UserSchema.index({ title: 'text' });

//exporting the model
const User = mongoose.model('anime', UserSchema, 'anime');
module.exports = { animeModel: User };
