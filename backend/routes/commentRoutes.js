const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addComment);
router.get('/:postId/comments', getComments);

module.exports = router;
