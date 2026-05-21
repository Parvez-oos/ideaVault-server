// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middlewares/verifyToken');

// Public
router.get('/idea/:ideaId', commentController.getCommentsByIdea);

// Private
router.post('/', verifyToken, commentController.addComment);
router.put('/:id', verifyToken, commentController.updateComment);
router.delete('/:id', verifyToken, commentController.deleteComment);
router.get('/interactions/:email', verifyToken, commentController.getUserInteractions);

module.exports = router;