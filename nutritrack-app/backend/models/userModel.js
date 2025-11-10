const mongoose = require('mongoose');
const User = require('./User');

exports.findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

exports.findUserById = async (userId) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return null;
    }
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find().select('-password');
    return users.map(user => ({
      UserID: user._id,
      Name: user.name,
      Email: user.email,
      Height: user.height,
      Weight: user.weight,
      Role: user.role,
      createdAt: user.createdAt, // Include createdAt for statistics
      updatedAt: user.updatedAt // Include updatedAt if needed
    }));
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

exports.addUser = async (userData, credentialsData) => {
  try {
    const newUser = new User({
      name: userData.name,
      email: credentialsData.email,
      password: credentialsData.password,
      role: credentialsData.role,
      height: userData.height || 0,
      weight: userData.weight || 0
    });

    const savedUser = await newUser.save();
    return savedUser._id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format');
    }
    const result = await User.findByIdAndDelete(new mongoose.Types.ObjectId(userId));
    return result !== null;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

exports.updateUserHealthProfile = async (userId, height, weight) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format');
    }
    const user = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId),
      { height: Number(height), weight: Number(weight) },
      { new: true, runValidators: true }
    );
    return user !== null;
  } catch (error) {
    console.error('Error updating user health profile:', error);
    throw error;
  }
};
