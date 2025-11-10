const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/authMiddleware');
const Meal = require('../models/Meal');
const MealLog = require('../models/MealLog');
const UserGoal = require('../models/UserGoal');

// Get all available meals
router.get('/meals', protect, async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json({ 
      success: true, 
      data: meals.map(meal => ({
        MealID: meal._id,
        MealName: meal.mealName,
        Calories: meal.calories,
        NutritionalValue: meal.nutritionalValue,
        Type: meal.type
      }))
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch meals' });
  }
});

// Get user's daily calorie limit
router.get('/dailylimit', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }
    
    const userGoal = await UserGoal.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    });
    const dailyLimit = userGoal ? userGoal.dailyCalorieLimit : 2000; // Default daily calorie limit
    res.json({ success: true, data: { dailyLimit } });
  } catch (error) {
    console.error('Error fetching daily limit:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch daily limit'
    });
  }
});

// Log a meal
router.post('/log', protect, async (req, res) => {
  try {
    const { mealId, mealType, date } = req.body;
    const userId = req.user.id;
    
    // Validate input
    if (!mealId || !mealType || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide mealId, mealType, and date'
      });
    }
    
    // Validate mealType
    const validMealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    if (!validMealTypes.includes(mealType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid meal type. Must be one of: Breakfast, Lunch, Dinner, Snack'
      });
    }
    
    // Validate date format
    const mealDate = new Date(date);
    if (isNaN(mealDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(mealId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    // Get meal calorie information
    const meal = await Meal.findById(mealId);
    
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }
    
    // Insert the meal log
    const mealLog = new MealLog({
      userId: new mongoose.Types.ObjectId(userId),
      mealId: new mongoose.Types.ObjectId(mealId),
      date: mealDate,
      mealType,
      calorieIntake: meal.calories
    });
    
    await mealLog.save();
    
    // Get user's total calories for the day
    const startOfDay = new Date(mealDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(mealDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const dailyTotalResult = await MealLog.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          totalCalories: { $sum: '$calorieIntake' }
        }
      }
    ]);
    
    const totalCalories = dailyTotalResult.length > 0 ? dailyTotalResult[0].totalCalories : meal.calories;
    
    // Get user's daily calorie limit
    // Mongoose automatically converts string IDs to ObjectId in queries
    const userGoal = await UserGoal.findOne({ userId });
    const dailyLimit = userGoal ? userGoal.dailyCalorieLimit : 2000; // Default if not set
    const userNutritionalGoal = userGoal ? userGoal.nutritionalGoal : null;
    
    // Prepare response with warnings if needed
    const response = {
      success: true,
      data: {
        mealLogged: true,
        totalCalories,
        dailyLimit
      }
    };
    
    // Check if daily limit is exceeded
    if (totalCalories > dailyLimit) {
      response.warnings = {
        calorieLimit: `Warning: You've exceeded your daily calorie limit of ${dailyLimit} calories.`
      };
    }
    
    // Check for nutritional value mismatch if user has a goal
    if (userNutritionalGoal && meal.nutritionalValue !== userNutritionalGoal) {
      if (!response.warnings) response.warnings = {};
      response.warnings.nutritionalMismatch = `Warning: This meal (${meal.nutritionalValue}) doesn't match your nutritional preference (${userNutritionalGoal}).`;
    }
    
    res.json(response);
  } catch (error) {
    console.error('Error logging meal:', error);
    res.status(500).json({ success: false, message: 'Failed to log meal' });
  }
});

// Get logged meals for a specific date
router.get('/logs/:date', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const dateParam = req.params.date;
    
    // Validate date format
    const queryDate = new Date(dateParam);
    if (isNaN(queryDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }
    
    const startOfDay = new Date(queryDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(queryDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Get all logged meals for the date with meal details
    const logs = await MealLog.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: startOfDay, $lte: endOfDay }
    })
      .populate('mealId', 'mealName nutritionalValue type calories')
      .sort({ mealType: 1, createdAt: -1 });
    
    // Format the response
    const formattedLogs = logs.map(log => ({
      MealLogID: log._id,
      Date: log.date,
      MealType: log.mealType,
      CalorieIntake: log.calorieIntake,
      MealName: log.mealId ? log.mealId.mealName : 'Unknown',
      NutritionalValue: log.mealId ? log.mealId.nutritionalValue : 'Unknown',
      Type: log.mealId ? log.mealId.type : 'Unknown'
    }));
    
    // Get total calories for the day
    const totalResult = await MealLog.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          totalCalories: { $sum: '$calorieIntake' }
        }
      }
    ]);
    
    const totalCalories = totalResult.length > 0 ? totalResult[0].totalCalories : 0;
    
    res.json({
      success: true,
      data: {
        logs: formattedLogs,
        totalCalories
      }
    });
  } catch (error) {
    console.error('Error fetching meal logs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch meal logs' });
  }
});

// Delete a meal log
router.delete('/logs/:id', protect, async (req, res) => {
  try {
    const logId = req.params.id;
    const userId = req.user.id;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(logId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    // Verify the log belongs to the user and get the date
    const log = await MealLog.findOne({
      _id: new mongoose.Types.ObjectId(logId),
      userId: new mongoose.Types.ObjectId(userId)
    });
    
    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Meal log not found or unauthorized'
      });
    }
    
    const logDate = log.date;
    
    // Delete the log
    await MealLog.findByIdAndDelete(new mongoose.Types.ObjectId(logId));
    
    // Get new total calories for the day
    const startOfDay = new Date(logDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(logDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const totalResult = await MealLog.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          totalCalories: { $sum: '$calorieIntake' }
        }
      }
    ]);
    
    const totalCalories = totalResult.length > 0 ? totalResult[0].totalCalories : 0;
    
    res.json({
      success: true,
      message: 'Meal log deleted successfully',
      data: {
        deleted: true,
        totalCalories
      }
    });
  } catch (error) {
    console.error('Error deleting meal log:', error);
    res.status(500).json({ success: false, message: 'Failed to delete meal log' });
  }
});

module.exports = router;
