const mongoose = require('mongoose');

const mealLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: [true, 'Meal ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  mealType: {
    type: String,
    required: [true, 'Meal type is required'],
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    trim: true
  },
  calorieIntake: {
    type: Number,
    required: [true, 'Calorie intake is required'],
    min: [0, 'Calorie intake must be positive']
  }
}, {
  timestamps: true
});

// Index for faster queries
mealLogSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('MealLog', mealLogSchema);

