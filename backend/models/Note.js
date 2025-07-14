// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String
  },
  tags: [String],
  favorite: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
