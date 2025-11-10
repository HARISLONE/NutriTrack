const mongoose = require('mongoose');

const userGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true // One goal per user
  },
  dailyCalorieLimit: {
    type: Number,
    required: [true, 'Daily calorie limit is required'],
    min: [0, 'Daily calorie limit must be positive']
  },
  nutritionalGoal: {
    type: String,
    required: [true, 'Nutritional goal is required'],
    trim: true
  },
  exerciseLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserGoal', userGoalSchema);

