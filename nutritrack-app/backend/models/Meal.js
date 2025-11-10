const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  mealName: {
    type: String,
    required: [true, 'Please provide a meal name'],
    trim: true,
    maxlength: [50, 'Meal name cannot be more than 50 characters']
  },
  calories: {
    type: Number,
    required: [true, 'Please provide calories'],
    min: [0, 'Calories must be positive']
  },
  nutritionalValue: {
    type: String,
    required: [true, 'Please provide nutritional value'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Veg', 'Non-Veg'],
    required: [true, 'Please specify meal type']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema);

