const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: [true, 'Please provide a plan name'],
    trim: true,
    maxlength: [50, 'Plan name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  nutritionalGoal: {
    type: String,
    required: [true, 'Please provide nutritional goal'],
    trim: true
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('DietPlan', dietPlanSchema);

