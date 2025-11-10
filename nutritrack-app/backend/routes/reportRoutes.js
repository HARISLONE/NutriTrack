const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/authMiddleware');
const MealLog = require('../models/MealLog');
const ExerciseLog = require('../models/ExerciseLog');

// Generate report based on type and date range
router.get('/generate', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const { reportType, startDate, endDate } = req.query;

    // Validate input
    if (!reportType || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Report type, startDate, and endDate are required'
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Validate date formats
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    
    // Validate date range (end should be after start)
    if (end < start) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }
    
    // Limit date range to prevent excessive queries (max 1 year)
    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (daysDiff > 365) {
      return res.status(400).json({
        success: false,
        message: 'Date range cannot exceed 365 days'
      });
    }
    
    end.setHours(23, 59, 59, 999); // Include the entire end date

    // Get meal logs for the date range
    const mealLogs = await MealLog.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: start, $lte: end }
    }).populate('mealId', 'calories');

    // Get exercise logs for the date range
    const exerciseLogs = await ExerciseLog.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: start, $lte: end }
    });

    // Group data by date
    const dailyDataMap = new Map();

    // Process meal logs
    mealLogs.forEach(log => {
      const dateStr = log.date.toISOString().split('T')[0];
      if (!dailyDataMap.has(dateStr)) {
        dailyDataMap.set(dateStr, {
          date: dateStr,
          calorieIntake: 0,
          calorieBurned: 0
        });
      }
      const dayData = dailyDataMap.get(dateStr);
      dayData.calorieIntake += log.calorieIntake;
    });

    // Process exercise logs
    exerciseLogs.forEach(log => {
      const dateStr = log.date.toISOString().split('T')[0];
      if (!dailyDataMap.has(dateStr)) {
        dailyDataMap.set(dateStr, {
          date: dateStr,
          calorieIntake: 0,
          calorieBurned: 0
        });
      }
      const dayData = dailyDataMap.get(dateStr);
      dayData.calorieBurned += log.caloriesBurned;
    });

    // Fill in missing dates with zero values
    const dailyData = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayData = dailyDataMap.get(dateStr) || {
        date: dateStr,
        calorieIntake: 0,
        calorieBurned: 0
      };
      
      const netCalories = dayData.calorieIntake - dayData.calorieBurned;
      dayData.progress = netCalories <= 0 ? 'Positive' : 'Negative';
      
      dailyData.push(dayData);
    }
    
    // Calculate summary statistics
    const calculateSummary = (data) => {
      let totalIntake = 0;
      let totalBurned = 0;
      let daysWithData = 0;

      data.forEach(day => {
        if (day.calorieIntake > 0 || day.calorieBurned > 0) {
          daysWithData++;
        }
        totalIntake += Number(day.calorieIntake);
        totalBurned += Number(day.calorieBurned);
      });

      const avgIntake = daysWithData > 0 ? Math.round(totalIntake / daysWithData) : 0;
      const avgBurned = daysWithData > 0 ? Math.round(totalBurned / daysWithData) : 0;
      const netCalories = totalIntake - totalBurned;
      const netProgress = netCalories <= 0 ? 'Positive' : 'Negative';

      return {
        totalIntake,
        totalBurned,
        netCalories,
        avgIntake,
        avgBurned,
        netProgress,
        daysTracked: daysWithData
      };
    };
    
    // Generate report summary
    const summary = calculateSummary(dailyData);
    
    res.status(200).json({
      success: true,
      data: {
        reportType,
        dateRange: {
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0]
        },
        dailyData,
        summary
      }
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate report'
    });
  }
});

module.exports = router;
