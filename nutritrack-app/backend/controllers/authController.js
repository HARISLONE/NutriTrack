const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();

    console.log('Login attempt for email:', normalizedEmail);

    // Find user by email and include password
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      console.log('User not found for email:', normalizedEmail);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.'
      });
    }

    console.log('User found. ID:', user._id, 'Email:', user.email);

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('Password mismatch for user:', normalizedEmail);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.'
      });
    }

    console.log('Password verified successfully');

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'demo_secret_key',
      { expiresIn: '1d' }
    );

    console.log('Login successful for user:', user.email);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.'
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        height: user.height,
        weight: user.weight
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user profile'
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'patient' } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();

    console.log('Attempting to register user with email:', normalizedEmail);

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      console.log('User already exists with email:', normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    console.log('Creating new user...');
    console.log('User data:', { name: name.trim(), email: normalizedEmail, role });

    // Create user - let Mongoose handle the password hashing via pre-save hook
    let user;
    try {
      user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: password, // Password will be hashed by pre-save hook
        role: role
      });
      console.log('✅ User created successfully with ID:', user._id);
      console.log('✅ User email:', user.email);
      console.log('✅ User name:', user.name);
    } catch (createError) {
      console.error('❌ Error creating user:', createError.message);
      console.error('❌ Error code:', createError.code);
      console.error('❌ Error name:', createError.name);
      throw createError; // Re-throw to be caught by outer catch
    }

    // Verify user was saved to database by querying again
    try {
      const savedUser = await User.findById(user._id);
      if (!savedUser) {
        console.error('❌ ERROR: User was created but not found in database!');
        return res.status(500).json({
          success: false,
          message: 'Failed to save user to database. Please try again.'
        });
      }
      console.log('✅ User verified in database. Email:', savedUser.email);
      
      // Also verify by email
      const userByEmail = await User.findOne({ email: normalizedEmail });
      if (!userByEmail) {
        console.error('❌ ERROR: User not found by email after creation!');
        return res.status(500).json({
          success: false,
          message: 'User was created but could not be retrieved. Please try logging in.'
        });
      }
      console.log('✅ User verified by email lookup');
    } catch (verifyError) {
      console.error('❌ Error verifying user:', verifyError.message);
      // Continue anyway - user was created, verification is just a check
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'demo_secret_key',
      { expiresIn: '1d' }
    );

    console.log('JWT token generated successfully');

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(e => e.message).join(', ');
      return res.status(400).json({
        success: false,
        message: `Validation error: ${validationErrors}`
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration. Please try again.'
    });
  }
};
