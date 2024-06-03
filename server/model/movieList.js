const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  movies: [{ type: Object }],
  isPublic: { type: Boolean, default: false },
  thumbnail: { type: String },
});

const MovieList = mongoose.model('MovieList', movieListSchema);
module.exports = MovieList;
