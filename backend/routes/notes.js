const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/notesController');

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post('/', protect, createNote);

// @route   GET /api/notes
// @desc    Get all notes (with optional search & tag filtering)
// @access  Private
router.get('/', protect, getNotes);

// @route   GET /api/notes/:id
// @desc    Get a single note by ID
// @access  Private
router.get('/:id', protect, getNoteById);

// @route   PUT /api/notes/:id
// @desc    Update a note by ID
// @access  Private
router.put('/:id', protect, updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete a note by ID
// @access  Private
router.delete('/:id', protect, deleteNote);

module.exports = router;
