// controllers/commentController.js
const Comment = require('../models/Comment');
const Idea = require('../models/Idea');

exports.addComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentsByIdea = async (req, res) => {
    try {
        const comments = await Comment.find({ ideaId: req.params.ideaId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const updated = await Comment.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// For "My Interactions" Page
exports.getUserInteractions = async (req, res) => {
    try {
        const userEmail = req.params.email;
        // Find all comments by user
        const userComments = await Comment.find({ authorEmail: userEmail });
        // Extract unique idea IDs
        const ideaIds = [...new Set(userComments.map(c => c.ideaId.toString()))];
        // Fetch the ideas
        const interactedIdeas = await Idea.find({ _id: { $in: ideaIds } });
        
        res.status(200).json(interactedIdeas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};