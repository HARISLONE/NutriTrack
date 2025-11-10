const mongoose = require('mongoose');

const dieticianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  specialization: {
    type: String,
    required: [true, 'Please provide specialization'],
    trim: true,
    maxlength: [50, 'Specialization cannot be more than 50 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dietician', dieticianSchema);

