// routes/ideaRoutes.js
const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');
const verifyToken = require('../middlewares/verifyToken');

// Public routes
router.get('/', ideaController.getIdeas);
router.get('/:id', ideaController.getIdeaById);

// Private routes
router.post('/', verifyToken, ideaController.createIdea);
router.get('/user/:email', verifyToken, ideaController.getUserIdeas);
router.put('/:id', verifyToken, ideaController.updateIdea);
router.delete('/:id', verifyToken, ideaController.deleteIdea);

module.exports = router;