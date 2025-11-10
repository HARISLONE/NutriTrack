const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['admin', 'patient'],
    default: 'patient'
  },
  height: {
    type: Number,
    min: [0, 'Height must be positive'],
    default: 0
  },
  weight: {
    type: Number,
    min: [0, 'Weight must be positive'],
    default: 0
  },
  bmi: {
    type: Number,
    default: 0
  },
  medicalHistoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalHistory',
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving (must be first to ensure password is hashed)
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully for user:', this.email);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Calculate BMI before saving (after password hashing)
userSchema.pre('save', function(next) {
  // Only calculate BMI if both height and weight are provided and valid
  if (this.height && this.weight && this.height > 0 && this.weight > 0) {
    const heightInMeters = this.height / 100;
    this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(2));
  } else {
    // Set BMI to 0 if height or weight is not provided
    this.bmi = 0;
  }
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    if (!this.password) {
      console.error('User password is missing');
      return false;
    }
    if (!enteredPassword) {
      console.error('Entered password is missing');
      return false;
    }
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    console.error('Error comparing password:', error);
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);

