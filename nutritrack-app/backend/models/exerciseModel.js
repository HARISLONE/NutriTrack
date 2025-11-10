const mongoose = require('mongoose');
const ExerciseLog = require('./ExerciseLog');

exports.getUserExerciseLogs = async (userId) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }
    const logs = await ExerciseLog.find({
      userId: new mongoose.Types.ObjectId(userId)
    })
      .sort({ date: -1, createdAt: -1 })
      .lean();
    
    return logs.map(log => ({
      ExerciseLogID: log._id,
      Date: log.date,
      ActivityType: log.activityType,
      Duration: log.duration,
      CaloriesBurned: log.caloriesBurned,
      UserID: log.userId
    }));
  } catch (error) {
    console.error('Error fetching exercise logs:', error);
    throw error;
  }
};

exports.getFilteredExerciseLogs = async (userId, filterType) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }
    const now = new Date();
    let startDate;

    switch (filterType) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      default:
        startDate = null;
    }

    const query = { userId: new mongoose.Types.ObjectId(userId) };
    if (startDate) {
      query.date = { $gte: startDate };
    }

    const logs = await ExerciseLog.find(query)
      .sort({ date: -1, createdAt: -1 })
      .lean();
    
    return logs.map(log => ({
      ExerciseLogID: log._id,
      Date: log.date,
      ActivityType: log.activityType,
      Duration: log.duration,
      CaloriesBurned: log.caloriesBurned,
      UserID: log.userId
    }));
  } catch (error) {
    console.error('Error fetching filtered exercise logs:', error);
    throw error;
  }
};

exports.addExerciseLog = async (exerciseData) => {
  try {
    const { userId, activityType, duration, date, caloriesBurned } = exerciseData;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format');
    }
    
    // Ensure date is a Date object (it might already be a Date object from the route)
    const exerciseDate = date instanceof Date ? date : new Date(date);
    
    // Validate the date
    if (isNaN(exerciseDate.getTime())) {
      throw new Error('Invalid date format');
    }
    
    const newLog = new ExerciseLog({
      userId: new mongoose.Types.ObjectId(userId),
      activityType: activityType.trim(),
      duration: duration.trim(),
      date: exerciseDate,
      caloriesBurned: Number(caloriesBurned)
    });
    
    const savedLog = await newLog.save();
    return savedLog._id;
  } catch (error) {
    console.error('Error adding exercise log:', error);
    throw error;
  }
};

exports.deleteExerciseLog = async (logId, userId) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(logId) || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid ID format');
    }
    
    const result = await ExerciseLog.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(logId),
      userId: new mongoose.Types.ObjectId(userId)
    });
    
    return result !== null;
  } catch (error) {
    console.error('Error deleting exercise log:', error);
    throw error;
  }
};

exports.getTotalCaloriesBurned = async (userId, filterType) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return 0;
    }
    const now = new Date();
    let startDate;

    switch (filterType) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      default:
        startDate = null;
    }

    const query = { userId: new mongoose.Types.ObjectId(userId) };
    if (startDate) {
      query.date = { $gte: startDate };
    }

    const result = await ExerciseLog.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalCalories: { $sum: '$caloriesBurned' }
        }
      }
    ]);

    return result.length > 0 ? result[0].totalCalories : 0;
  } catch (error) {
    console.error('Error calculating total calories burned:', error);
    throw error;
  }
};
