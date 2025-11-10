const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here are protected and require admin role
router.use(protect, authorize('admin'));

// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({
      success: true,
      data: {
        users
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching users'
    });
  }
});

// POST /api/admin/users - Add a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, role, height, weight } = req.body;
    
    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, password and role'
      });
    }
    
    // Validate role
    if (!['admin', 'patient'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either "admin" or "patient"'
      });
    }
    
    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Validate height and weight if provided
    if (height !== undefined && (isNaN(height) || height < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Height must be a positive number'
      });
    }
    
    if (weight !== undefined && (isNaN(weight) || weight < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Weight must be a positive number'
      });
    }
    
    const userId = await userModel.addUser(
      { name: name.trim(), height: height || 0, weight: weight || 0 },
      { email: email.toLowerCase().trim(), password, role }
    );
    
    res.status(201).json({
      success: true,
      message: 'User added successfully',
      data: {
        userId
      }
    });
  } catch (error) {
    console.error('Error adding user:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server error adding user'
    });
  }
});

// DELETE /api/admin/users/:id - Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    
    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }
    
    const success = await userModel.deleteUser(userId);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting user'
    });
  }
});

module.exports = router;
