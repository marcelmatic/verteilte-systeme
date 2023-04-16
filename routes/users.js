// Import necessary dependencies
const express = require("express"); // Import the Express library
const router = express.Router(); // Create a new router instance
const User = require("../models/user"); // Import the User model
const bcrypt = require("bcrypt"); // import bcrypt for crypting the passwords

// ## ROUTES FOR USERS ##

// Route for getting all users
router.get("/", async (req, res) => {
  try {
    // Find all appointments in the database
    const users = await User.find();
    // Return the user object as JSON
    res.json(users);
  } catch (error) {
    // If an error occurs, return an error message and status code 500
    res.status(500).json({ message: error.message });
  }
});

// Route for getting a single user by username
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get user" });
  }
});

// Route for creating a new user
router.post("/", async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, role, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with the hashed password
    const newUser = await User.create({
      username,
      role,
      password: hashedPassword,
    });

    // Return the new user document as the response
    res.json(newUser);
  } catch (error) {
    // Handle any errors that occur during user creation
    if (error.code === 11000 && error.keyPattern.username) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Passwords match, so return the user document as the response
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to log in" });
  }
});




// Export the router module
module.exports = router;
