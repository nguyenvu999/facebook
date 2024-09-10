const express = require('express');
const { 
    signup, 
    signin,
    logout,
    suspendUser, 
    resumeUser, 
    getUsers, 
    updateUserProfile 
} = require('../controllers/authController');
const { validateFields } = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register - No authentication required
router.post('/sign-up', validateFields, signup);

// Login user - No authentication required
router.post('/sign-in', signin);

// Logout user - Authentication required
router.post('/logout', authMiddleware(), logout);

// Suspend user - Requires authentication and admin role
router.patch('/suspend/:id', authMiddleware(['admin']), suspendUser);

// Resume user - Requires authentication and admin role
router.patch('/resume/:id', authMiddleware(['admin']), resumeUser);

// Get all users - Requires authentication and admin role
router.get('/users', authMiddleware(['admin']), getUsers);

// Update user profile - Requires authentication
router.patch('/update-profile', authMiddleware(), updateUserProfile);

module.exports = router;