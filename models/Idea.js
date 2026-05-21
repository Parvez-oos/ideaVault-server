// models/Idea.js
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: String },
    imageURL: { type: String },
    estimatedBudget: { type: String },
    targetAudience: { type: String },
    problemStatement: { type: String },
    proposedSolution: { type: String },
    authorEmail: { type: String, required: true },
    authorName: { type: String, required: true },
    authorPhoto: { type: String },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Idea', ideaSchema);