const Note = require('../models/Note');

// @desc Create Note
// @route POST /api/notes
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title?.trim()) {
      return res.status(422).json({ message: 'Title is required' });
    }

    const note = await Note.create({
      user: req.user._id,
      title: title.trim(),
      content: content?.trim() || '',
      tags: Array.isArray(tags)
        ? tags.map(t => t.trim().toLowerCase())
        : []
    });

    res.status(201).json(note);
  } catch (err) {
    console.error('❌ Create Note Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all notes (with optional search & tags)
// @route GET /api/notes?q=term&tags=tag1,tag2&isFavoriteOnly=true
exports.getNotes = async (req, res) => {
  try {
    const { q, tags, isFavoriteOnly } = req.query;

    const query = { user: req.user._id };

    if (q?.trim()) {
      const regex = new RegExp(q.trim(), 'i');
      query.$or = [
        { title: regex },
        { content: regex },
        { tags: { $in: [regex] } }
      ];
    }

    if (tags) {
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean);

      if (tagArray.length > 0) {
        query.tags = { $in: tagArray };
      }
    }

    if (isFavoriteOnly === 'true') {
      query.favorite = true;
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('❌ Get Notes Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc Get single note
// @route GET /api/notes/:id
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    console.error('❌ Get Note By ID Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update note
// @route PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  try {
    const { title, content, tags, favorite } = req.body;

    const updatedFields = {
      ...(title && { title: title.trim() }),
      ...(content && { content: content.trim() }),
      ...(tags && Array.isArray(tags) && {
        tags: tags.map(t => t.trim().toLowerCase())
      }),
      ...(typeof favorite === 'boolean' && { favorite })
    };

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updatedFields,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    console.error('❌ Update Note Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Delete note
// @route DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('❌ Delete Note Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
