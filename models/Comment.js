// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    ideaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
    text: { type: String, required: true },
    authorEmail: { type: String, required: true },
    authorName: { type: String, required: true },
    authorPhoto: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);