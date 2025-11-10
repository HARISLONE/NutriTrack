// dietController.js
const mongoose = require('mongoose');
const DietPlan = require('../models/DietPlan');
const Meal = require('../models/Meal');
const UserGoal = require('../models/UserGoal');

// Get all available nutritional goals
exports.getNutritionalGoals = async (req, res) => {
  try {
    // Define standard nutritional goals (since we're seeding meals with these)
    const standardGoals = [
      'Weight Loss',
      'Muscle Gain',
      'Heart Health',
      'Diabetes Management',
      'Low Carb'
    ];
    
    // Also get unique nutritional goals from existing diet plans and meals
    const dietPlans = await DietPlan.distinct('nutritionalGoal');
    const meals = await Meal.distinct('nutritionalValue');
    const allGoals = [...new Set([...standardGoals, ...dietPlans, ...meals])];
    
    res.status(200).json({
      success: true,
      data: allGoals
    });
  } catch (error) {
    console.error('Error fetching nutritional goals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nutritional goals'
    });
  }
};

// Get user's current goal
exports.getUserGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }
    
    // Mongoose automatically converts string IDs to ObjectId in queries
    const userGoal = await UserGoal.findOne({ userId });
    
    if (!userGoal) {
      return res.status(200).json({
        success: true,
        data: null
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        nutritionalGoal: userGoal.nutritionalGoal,
        dailyCalorieLimit: userGoal.dailyCalorieLimit,
        exerciseLevel: userGoal.exerciseLevel
      }
    });
  } catch (error) {
    console.error('Error fetching user goal:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user goal'
    });
  }
};

// Save user's nutritional goal
exports.saveUserGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nutritionalGoal, exerciseLevel } = req.body;
    
    // Validate input
    if (!nutritionalGoal) {
      return res.status(400).json({
        success: false,
        message: 'Nutritional goal is required'
      });
    }
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }
    
    // Calculate daily calorie limit based on exercise level
    let dailyCalorieLimit;
    switch (exerciseLevel) {
      case 'Low':
        dailyCalorieLimit = 1800;
        break;
      case 'Medium':
        dailyCalorieLimit = 2200;
        break;
      case 'High':
        dailyCalorieLimit = 2600;
        break;
      default:
        dailyCalorieLimit = 2000;
    }

    // Update or create user goal
    const userGoal = await UserGoal.findOneAndUpdate(
      { userId },
      {
        userId,
        nutritionalGoal,
        dailyCalorieLimit,
        exerciseLevel: exerciseLevel || 'Medium'
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: 'Goal saved successfully',
      data: {
        nutritionalGoal: userGoal.nutritionalGoal,
        dailyCalorieLimit: userGoal.dailyCalorieLimit,
        exerciseLevel: userGoal.exerciseLevel
      }
    });
  } catch (error) {
    console.error('Error saving user goal:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save user goal'
    });
  }
};

// Get recommended meals based on nutritional goal and exercise level
exports.getRecommendedMeals = async (req, res) => {
  try {
    const { nutritionalGoal, exerciseLevel } = req.query;
    
    // Validate input
    if (!nutritionalGoal || !exerciseLevel) {
      return res.status(400).json({
        success: false,
        message: 'Nutritional goal and exercise level are required'
      });
    }

    let filteredMeals = [];

    // Filter meals based on nutritional goal
    switch (nutritionalGoal) {
      case 'Weight Loss':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Low calorie|High fiber|Balanced/i } },
            { calories: { $lte: 350 } }
          ]
        }).limit(10);
        break;

      case 'Muscle Gain':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /High protein|Protein/i } },
            { type: 'Non-Veg' },
            { calories: { $gte: 300 } }
          ]
        }).limit(10);
        break;

      case 'Heart Health':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Low fat|Omega|Balanced/i } },
            { type: 'Veg' },
            { calories: { $lte: 400 } }
          ]
        }).limit(10);
        break;

      case 'Diabetes Management':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Low carb|Low glycemic|Balanced/i } },
            { calories: { $lte: 350 } }
          ]
        }).limit(10);
        break;

      case 'Low Carb':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Low carb|Protein/i } },
            { calories: { $lte: 300 } }
          ]
        }).limit(10);
        break;

      case 'High Fiber':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /High fiber|Balanced/i } },
            { mealName: { $regex: /Oats|Lentil|Quinoa/i } }
          ]
        }).limit(10);
        break;

      case 'High Protein':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /High protein|Protein/i } },
            { type: 'Non-Veg' },
            { mealName: { $regex: /Protein|Chicken|Egg/i } }
          ]
        }).limit(10);
        break;

      case 'Vitamins':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Vitamins|Fruit|Iron/i } },
            { mealName: { $regex: /Fruit|Smoothie|Salad/i } }
          ]
        }).limit(10);
        break;

      case 'Low Fat':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Low fat|Low carb/i } },
            { calories: { $lte: 250 } }
          ]
        }).limit(10);
        break;

      case 'Probiotic':
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Probiotic|Balanced/i } },
            { mealName: { $regex: /Yogurt/i } },
            { type: 'Veg' }
          ]
        }).limit(10);
        break;

      case 'Balanced':
      default:
        filteredMeals = await Meal.find({
          $or: [
            { nutritionalValue: { $regex: /Balanced/i } },
            { calories: { $gte: 200, $lte: 400 } }
          ]
        }).limit(10);
        break;
    }

    // Further filter based on exercise level
    switch (exerciseLevel) {
      case 'Low':
        filteredMeals = filteredMeals.filter(meal => meal.calories <= 300);
        break;
      case 'Medium':
        filteredMeals = filteredMeals.filter(meal => meal.calories >= 200 && meal.calories <= 400);
        break;
      case 'High':
        filteredMeals = filteredMeals.filter(meal => meal.calories >= 350);
        break;
      default:
        break;
    }

    // Ensure we have at least some meals, fallback to balanced meals if filter is too restrictive
    if (filteredMeals.length < 3) {
      filteredMeals = await Meal.find({
        $or: [
          { nutritionalValue: { $regex: /Balanced/i } },
          { calories: { $gte: 200, $lte: 400 } }
        ]
      }).limit(8);
    }

    // Format the response to match expected structure
    const recommendedMeals = filteredMeals.slice(0, 8).map(meal => ({
      mealId: meal._id,
      mealName: meal.mealName,
      calories: meal.calories,
      nutritionalValue: meal.nutritionalValue,
      type: meal.type
    }));

    res.status(200).json({
      success: true,
      data: recommendedMeals
    });
  } catch (error) {
    console.error('Error fetching recommended meals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommended meals'
    });
  }
};

