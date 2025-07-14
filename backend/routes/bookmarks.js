const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarkController');

// @route   POST /api/bookmarks
// @desc    Create a new bookmark
// @access  Private
router.post('/', protect, createBookmark);

// @route   GET /api/bookmarks
// @desc    Get all bookmarks (with optional search and tag filtering)
// @access  Private
router.get('/', protect, getBookmarks);

// @route   GET /api/bookmarks/:id
// @desc    Get a single bookmark by ID
// @access  Private
router.get('/:id', protect, getBookmarkById);

// @route   PUT /api/bookmarks/:id
// @desc    Update a bookmark by ID
// @access  Private
router.put('/:id', protect, updateBookmark);

// @route   DELETE /api/bookmarks/:id
// @desc    Delete a bookmark by ID
// @access  Private
router.delete('/:id', protect, deleteBookmark);

module.exports = router;
