const cloudinaryUpload = require('../lib/cloudinaryService');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

const collection = 'post';

const createPost = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file info:', req.file);
    const { caption, isPrivate } = req.body;
    const author = req.session.userId;

    if (!author) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    let imgURL = null;
    if (req.file) {
      const { buffer, originalname } = req.file;

      // Upload image to Cloudinary in 'post' folder
      const cloudinaryResponse = await cloudinaryUpload(buffer, originalname, collection);
      console.log('Cloudinary response:', cloudinaryResponse);

      if (cloudinaryResponse && cloudinaryResponse.secure_url) {
        imgURL = cloudinaryResponse.secure_url;
      } else {
        console.error('Cloudinary response does not contain secure_url');
      }
    }

    const newPost = new Post({
      author,
      caption,
      isPrivate,
      imgURL
    });

    const savedPost = await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId).populate('friendList');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendList = user.friendList.map(friend => friend._id);

    const posts = await Post.find({
      $or: [
        { author: { $in: [...friendList, userId] } },
        { isPrivate: false }
      ]
    }).populate('author', 'name')
      .populate('comment');

    res.status(200).json(posts);
  } catch (error) {

    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const likeReaction = async (req, res) => {
  try {
    const userId = req.session.userId;
    const postId = req.params.postId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(like => !like.equals(userId));
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({ message: 'Post liked/unliked successfully', likes: post.likes });
  } catch (error) {
    console.error('Error toggling like on post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const hateReaction = async (req, res) => {
  try {
    const userId = req.session.userId;
    const postId = req.params.postId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.hates.includes(userId)) {
      post.hates = post.hates.filter(hate => !hate.equals(userId));
    } else {
      post.hates.push(userId);
    }

    await post.save();

    res.status(200).json({ message: 'Post hated/neutralized successfully', hates: post.hates });
  } catch (error) {
    console.error('Error toggling hate on post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete Post Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  likeReaction,
  hateReaction,
  deletePost
};