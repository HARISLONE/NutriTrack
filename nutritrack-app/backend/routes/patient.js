const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { protect, authorize } = require('../middleware/authMiddleware');
// All routes here are protected and require patient role
router.use(protect, authorize('patient'));

// GET /api/patient/profile - Get patient profile
router.get('/profile', async (req, res) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        height: user.height,
        weight: user.weight
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching patient profile'
    });
  }
});

// PUT /api/patient/profile - Update patient profile
router.put('/profile', async (req, res) => {
  try {
    const { height, weight } = req.body;
    const userId = req.user.id;
    
    // Validate input
    if (height === undefined && weight === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least height or weight to update'
      });
    }
    
    // Validate height if provided
    if (height !== undefined) {
      const heightNum = Number(height);
      if (isNaN(heightNum) || heightNum <= 0 || heightNum > 300) {
        return res.status(400).json({
          success: false,
          message: 'Height must be a positive number between 1 and 300 cm'
        });
      }
    }
    
    // Validate weight if provided
    if (weight !== undefined) {
      const weightNum = Number(weight);
      if (isNaN(weightNum) || weightNum <= 0 || weightNum > 1000) {
        return res.status(400).json({
          success: false,
          message: 'Weight must be a positive number between 1 and 1000 kg'
        });
      }
    }
    
    // Validate ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }
    
    // Get current user data
    const currentUser = await userModel.findUserById(userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user's height and weight in database
    const updateData = {
      height: height !== undefined ? Number(height) : currentUser.height,
      weight: weight !== undefined ? Number(weight) : currentUser.weight
    };
    
    const success = await userModel.updateUserHealthProfile(userId, updateData.height, updateData.weight);
    
    if (!success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update profile'
      });
    }
    
    // Get updated user data
    const updatedUser = await userModel.findUserById(userId);
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          height: updatedUser.height,
          weight: updatedUser.weight,
          bmi: updatedUser.bmi
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating patient profile'
    });
  }
});

module.exports = router;