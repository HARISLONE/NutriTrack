const express = require('express');
const router = express.Router();
const exerciseModel = require('../models/exerciseModel');
const { protect, authorize } = require('../middleware/authMiddleware');

// Apply middleware to all routes - only authenticated patients can access
router.use(protect, authorize('patient'));

// GET /api/exercises - Get all exercise logs for the logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const filterType = req.query.filter || 'all'; // Default to 'all' if not specified
    
    // Validate filter type
    const validFilters = ['all', 'today', 'week', 'month'];
    if (!validFilters.includes(filterType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filter type. Must be one of: all, today, week, month'
      });
    }
    
    // Validate ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }
    
    let exercises;
    if (filterType === 'all') {
      exercises = await exerciseModel.getUserExerciseLogs(userId);
    } else {
      exercises = await exerciseModel.getFilteredExerciseLogs(userId, filterType);
    }
    
    // Calculate total calories burned
    const totalCalories = await exerciseModel.getTotalCaloriesBurned(userId, filterType);
    
    res.status(200).json({
      success: true,
      data: {
        exercises,
        totalCalories
      }
    });
  } catch (error) {
    console.error('Error fetching exercise logs:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching exercise logs'
    });
  }
});

// POST /api/exercises - Add a new exercise log
router.post('/', async (req, res) => {
  try {
    const { ActivityType, Duration, Date: exerciseDateStr, CaloriesBurned } = req.body;
    const userId = req.user.id;
    
    // Validate input
    if (!ActivityType || !Duration || !exerciseDateStr || CaloriesBurned === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: ActivityType, Duration, Date, and CaloriesBurned'
      });
    }
    
    // Validate date format - Date is a reserved keyword, so we use exerciseDateStr
    const exerciseDate = new Date(exerciseDateStr);
    if (isNaN(exerciseDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Please use YYYY-MM-DD format.'
      });
    }
    
    // Validate calories
    const calories = Number(CaloriesBurned);
    if (isNaN(calories) || calories < 0) {
      return res.status(400).json({
        success: false,
        message: 'CaloriesBurned must be a positive number'
      });
    }
    
    // Validate activity type length
    if (ActivityType.trim().length === 0 || ActivityType.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'ActivityType must be between 1 and 50 characters'
      });
    }
    
    // Add exercise log - use the validated Date object
    const exerciseData = {
      userId,
      activityType: ActivityType.trim(),
      duration: Duration.trim(),
      date: exerciseDate, // Use the validated Date object
      caloriesBurned: calories
    };
    
    const logId = await exerciseModel.addExerciseLog(exerciseData);
    
    res.status(201).json({
      success: true,
      message: 'Exercise logged successfully',
      data: {
        exerciseLogId: logId
      }
    });
  } catch (error) {
    console.error('Error logging exercise:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while logging exercise'
    });
  }
});

// DELETE /api/exercises/:id - Delete an exercise log
router.delete('/:id', async (req, res) => {
  try {
    const logId = req.params.id;
    const userId = req.user.id;
    
    // Validate ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(logId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    const success = await exerciseModel.deleteExerciseLog(logId, userId);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Exercise log not found or you do not have permission to delete it'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Exercise log deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting exercise log:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while deleting exercise log'
    });
  }
});

module.exports = router;