const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Meal = require('../models/Meal');
const Dietician = require('../models/Dietician');
require('dotenv').config();

// Seed data
const meals = [
  { mealName: 'Oats Bowl', calories: 250, nutritionalValue: 'High Fiber', type: 'Veg' },
  { mealName: 'Grilled Chicken', calories: 400, nutritionalValue: 'High Protein', type: 'Non-Veg' },
  { mealName: 'Fruit Salad', calories: 180, nutritionalValue: 'Vitamins', type: 'Veg' },
  { mealName: 'Veg Sandwich', calories: 300, nutritionalValue: 'Balanced', type: 'Veg' },
  { mealName: 'Paneer Wrap', calories: 350, nutritionalValue: 'Protein Rich', type: 'Veg' },
  { mealName: 'Smoothie', calories: 220, nutritionalValue: 'Fruit Boost', type: 'Veg' },
  { mealName: 'Boiled Eggs', calories: 150, nutritionalValue: 'Protein', type: 'Non-Veg' },
  { mealName: 'Rice & Dal', calories: 450, nutritionalValue: 'Balanced', type: 'Veg' },
  { mealName: 'Quinoa Salad', calories: 320, nutritionalValue: 'Low Carb', type: 'Veg' },
  { mealName: 'Tofu Stir Fry', calories: 280, nutritionalValue: 'Low Fat', type: 'Veg' },
  { mealName: 'Chicken Caesar', calories: 390, nutritionalValue: 'Low Carb', type: 'Non-Veg' },
  { mealName: 'Greek Yogurt', calories: 120, nutritionalValue: 'Probiotic', type: 'Veg' },
  { mealName: 'Tuna Salad', calories: 350, nutritionalValue: 'High Protein', type: 'Non-Veg' },
  { mealName: 'Lentil Soup', calories: 230, nutritionalValue: 'High Fiber', type: 'Veg' },
  { mealName: 'Avocado Toast', calories: 310, nutritionalValue: 'Healthy Fat', type: 'Veg' },
  { mealName: 'Spinach Omelette', calories: 200, nutritionalValue: 'Iron Rich', type: 'Non-Veg' },
  { mealName: 'Protein Shake', calories: 180, nutritionalValue: 'Protein', type: 'Veg' },
  { mealName: 'Chickpea Bowl', calories: 330, nutritionalValue: 'Protein Rich', type: 'Veg' },
  { mealName: 'Grilled Fish', calories: 370, nutritionalValue: 'Omega 3', type: 'Non-Veg' },
  { mealName: 'Veggie Wrap', calories: 290, nutritionalValue: 'Balanced', type: 'Veg' }
];

const dieticians = [
  { name: 'Dr. Anita Rao', specialization: 'Weight Loss' },
  { name: 'Dr. Ramesh Iyer', specialization: 'Diabetes' },
  { name: 'Dr. Sneha Jain', specialization: 'Sports Nutrition' },
  { name: 'Dr. Farhan Qureshi', specialization: 'Ketogenic Diet' },
  { name: 'Dr. Ishita Reddy', specialization: 'Gluten-Free Diet' }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data (optional - remove if you want to keep existing data)
    // await User.deleteMany({});
    // await Meal.deleteMany({});
    // await Dietician.deleteMany({});

    // Check if meals already exist
    const existingMeals = await Meal.countDocuments();
    if (existingMeals === 0) {
      await Meal.insertMany(meals);
      console.log('✅ Meals seeded successfully');
    } else {
      console.log('ℹ️  Meals already exist, skipping...');
    }

    // Check if dieticians already exist
    const existingDieticians = await Dietician.countDocuments();
    if (existingDieticians === 0) {
      await Dietician.insertMany(dieticians);
      console.log('✅ Dieticians seeded successfully');
    } else {
      console.log('ℹ️  Dieticians already exist, skipping...');
    }

    // Create default admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@nutritrack.com' });
    if (!adminExists) {
      await User.create({
        name: 'AdminOne',
        email: 'admin@nutritrack.com',
        password: 'admin123',
        role: 'admin',
        height: 175,
        weight: 70
      });
      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️  Admin user already exists, skipping...');
    }

    // Create default patient user if it doesn't exist
    const patientExists = await User.findOne({ email: 'rohit@nutritrack.com' });
    if (!patientExists) {
      await User.create({
        name: 'Rohit',
        email: 'rohit@nutritrack.com',
        password: 'patient123',
        role: 'patient',
        height: 180,
        weight: 75
      });
      console.log('✅ Patient user created successfully');
    } else {
      console.log('ℹ️  Patient user already exists, skipping...');
    }

    console.log('🎉 Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

