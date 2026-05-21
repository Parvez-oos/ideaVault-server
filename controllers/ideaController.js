// controllers/ideaController.js
const Idea = require('../models/Idea');

exports.createIdea = async (req, res) => {
    try {
        const newIdea = new Idea(req.body);
        const savedIdea = await newIdea.save();
        res.status(201).json(savedIdea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIdeas = async (req, res) => {
    try {
        const { search, category, limit } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        const ideas = await Idea.find(query)
            .sort({ createdAt: -1 })
            .limit(limit ? parseInt(limit) : 0);
            
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIdeaById = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        if (!idea) return res.status(404).json({ message: 'Idea not found' });
        res.status(200).json(idea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find({ authorEmail: req.params.email }).sort({ createdAt: -1 });
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateIdea = async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIdea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteIdea = async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Idea deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};