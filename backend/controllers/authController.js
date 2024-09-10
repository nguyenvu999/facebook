const User = require('../models/User');
const bcrypt = require('bcrypt');

// Reusable function to check user by email
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.error('Error finding user by email:', error);
        return null;
    }
};

// Register a new user
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Login user
const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
  
      const user = await findUserByEmail(email);
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      if (user.isSuspended) {
        return res.status(403).json({ success: false, message: 'Your account has been suspended' });
      }
  
      req.session.userId = user._id;
      req.session.role = user.role;
  
      res.status(200).json({ 
        success: true, 
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          imageUrl: user.imageUrl
        }
      });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

// Update user status (suspend or resume)
const updateUserStatus = async (req, res, isSuspended) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { isSuspended }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: isSuspended ? 'User suspended successfully' : 'User resumed successfully',
            user
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Suspend a user
const suspendUser = (req, res) => updateUserStatus(req, res, true);

// Resume a user
const resumeUser = (req, res) => updateUserStatus(req, res, false);

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ error: 'Password must be at least 6 characters long' });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        if (email) {
            user.email = email;
        }

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Logout user
const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout Error:', err);
        return res.status(500).json({ success: false, message: 'Failed to logout' });
      }
      res.clearCookie('connect.sid', { path: '/' }); // Clear session cookie
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  };

module.exports = {
    signup, // Register user
    signin, // Login user
    suspendUser, // Suspend user
    resumeUser, // Resume user
    getUsers, // Get users
    updateUserProfile, // Update user profile
    logout // Logout user
};