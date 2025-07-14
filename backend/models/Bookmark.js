// models/Bookmark.js
const mongoose = require('mongoose');
const validator = require('validator');

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    validate: {
      validator: validator.isURL,
      message: 'Invalid URL'
    }
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  tags: [String],
  favorite: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
