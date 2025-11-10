const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/authMiddleware');
const Dietician = require('../models/Dietician');
const Appointment = require('../models/Appointment');

// Get all dieticians
router.get('/dieticians', protect, async (req, res) => {
  try {
    const dieticians = await Dietician.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      data: {
        dieticians: dieticians.map(d => ({
          DieticianID: d._id,
          Name: d.name,
          Specialization: d.specialization
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching dieticians:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching dieticians'
    });
  }
});

// Get user's appointments
router.get('/user', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }
    
    const appointments = await Appointment.find({
      userId: new mongoose.Types.ObjectId(userId)
    })
      .populate('dieticianId', 'name specialization')
      .sort({ date: 1, time: 1 });
    
    res.status(200).json({
      success: true,
      data: {
        appointments: appointments.map(apt => ({
          AppointmentID: apt._id,
          Date: apt.date,
          Time: apt.time,
          DieticianName: apt.dieticianId ? apt.dieticianId.name : 'Unknown',
          Specialization: apt.dieticianId ? apt.dieticianId.specialization : 'Unknown'
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching appointments'
    });
  }
});

// Schedule new appointment
router.post('/', protect, async (req, res) => {
  try {
    const { dieticianId, date, time } = req.body;
    const userId = req.user.id;
    
    // Validate input
    if (!dieticianId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide dieticianId, date, and time'
      });
    }
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(dieticianId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    // Validate date format
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    
    // Validate time format (should be HH:MM:SS or HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:([0-5][0-9]))?$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time format. Expected format: HH:MM or HH:MM:SS'
      });
    }
    
    // Check if appointment date is in the past
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    if (appointmentDate < now) {
      return res.status(400).json({
        success: false,
        message: 'Cannot schedule appointment in the past'
      });
    }
    
    // Check if dietician exists
    const dietician = await Dietician.findById(dieticianId);
    if (!dietician) {
      return res.status(404).json({
        success: false,
        message: 'Dietician not found'
      });
    }
    
    // Check if user already has an appointment at the same date and time
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingAppointment = await Appointment.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: startOfDay, $lte: endOfDay },
      time: time
    });
    
    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'You already have an appointment scheduled at this date and time'
      });
    }
    
    // Create the appointment
    const appointment = new Appointment({
      userId: new mongoose.Types.ObjectId(userId),
      dieticianId: new mongoose.Types.ObjectId(dieticianId),
      date: appointmentDate,
      time: time
    });
    
    await appointment.save();
    
    // Populate and return the appointment
    await appointment.populate('dieticianId', 'name specialization');
    
    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      data: {
        appointment: {
          AppointmentID: appointment._id,
          Date: appointment.date,
          Time: appointment.time,
          DieticianName: appointment.dieticianId.name,
          Specialization: appointment.dieticianId.specialization
        }
      }
    });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You already have an appointment scheduled at this date and time'
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while scheduling appointment'
    });
  }
});

// Cancel appointment
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const userId = req.user.id;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(appointmentId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    // Verify appointment belongs to user and delete
    const appointment = await Appointment.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(appointmentId),
      userId: new mongoose.Types.ObjectId(userId)
    });
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found or does not belong to you'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while cancelling appointment'
    });
  }
});

module.exports = router;
