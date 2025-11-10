const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  dieticianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dietician',
    required: [true, 'Dietician ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  }
}, {
  timestamps: true
});

// Index to prevent duplicate appointments
appointmentSchema.index({ userId: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

