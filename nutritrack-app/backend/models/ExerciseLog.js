const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  activityType: {
    type: String,
    required: [true, 'Activity type is required'],
    trim: true,
    maxlength: [50, 'Activity type cannot be more than 50 characters']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  caloriesBurned: {
    type: Number,
    required: [true, 'Calories burned is required'],
    min: [0, 'Calories burned must be positive']
  }
}, {
  timestamps: true
});

// Index for faster queries
exerciseLogSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('ExerciseLog', exerciseLogSchema);

