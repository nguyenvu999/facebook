const express = require('express');
const {
  createPost,
  getPosts,
  likePost,
  hatePost,
  likeReaction,
  hateReaction
} = require('../controllers/postController');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware'); // Import your auth middleware

const router = express.Router();

// Route to create a post with file upload, requires authentication
router.post('/create-post', authMiddleware(), fileUploadMiddleware, createPost);

// Route to get posts, requires authentication
router.get('/get-posts', authMiddleware(), getPosts);

// Route to like a post, requires authentication
router.post('/like/:postId', authMiddleware(), likeReaction);

// Route to hate a post, requires authentication
router.post('/hate/:postId', authMiddleware(), hateReaction);

module.exports = router;