const Bookmark = require('../models/Bookmark');
const fetchTitleFromUrl = require('../utils/fetchMetadata');

// @desc Create bookmark
// @route POST /api/bookmarks
exports.createBookmark = async (req, res) => {
  try {
    const { url, title, description, tags } = req.body;

    if (!url) {
      return res.status(422).json({ message: 'URL is required' });
    }

    let finalTitle = title;
    if (!finalTitle) {
      finalTitle = await fetchTitleFromUrl(url);
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      url,
      title: finalTitle,
      description,
      tags,
      favorite: false, // default
    });

    res.status(201).json(bookmark);
  } catch (err) {
    console.error('Create Bookmark Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all bookmarks with optional search, tags, favorites
// @route GET /api/bookmarks?q=term&tags=tag1,tag2&isFavoriteOnly=true
exports.getBookmarks = async (req, res) => {
  try {
    const { q, tags, isFavoriteOnly } = req.query;

    const query = { user: req.user._id };

    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { tags: regex }
      ];
    }

    if (tags) {
      query.tags = { $in: tags.split(',').map(tag => tag.trim()) };
    }

    if (isFavoriteOnly === 'true') {
      query.favorite = true;
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error('Get Bookmarks Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get single bookmark
// @route GET /api/bookmarks/:id
exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json(bookmark);
  } catch (err) {
    console.error('Get Bookmark By ID Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update bookmark (supports favorite toggle)
// @route PUT /api/bookmarks/:id
exports.updateBookmark = async (req, res) => {
  try {
    const { url, title, description, tags, favorite } = req.body;

    const updatedData = {};
    if (url !== undefined) updatedData.url = url;
    if (title !== undefined) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (tags !== undefined) updatedData.tags = tags;
    if (typeof favorite === 'boolean') updatedData.favorite = favorite;

    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updatedData,
      { new: true }
    );

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json(bookmark);
  } catch (err) {
    console.error('Update Bookmark Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Delete bookmark
// @route DELETE /api/bookmarks/:id
exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark deleted successfully' });
  } catch (err) {
    console.error('Delete Bookmark Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
