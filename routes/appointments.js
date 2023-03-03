// Import necessary dependencies
const express = require("express"); // Import the Express library
const router = express.Router(); // Create a new router instance
const Appointments = require("../models/appointments"); // Import the User model

// ## ROUTES FOR APPOINTMENTS ##

// Route for getting all appointments
router.get("/", async (req, res) => {
  try {
    // Find all appointments in the database
    const appointments = await Appointments.find();
    // Return the appointments object as JSON
    res.json(appointments);
  } catch (error) {
    // If an error occurs, return an error message and status code 500
    res.status(500).json({ message: error.message });
  }
});

// Route for getting a single appointment by username
router.get("/:user", async (req, res) => {
  try {
    const username = req.params.user;
    const app = await Appointments.find({ user: username });
    if (!app) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    return res.json(app);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get user" });
  }
});

// Route for creating a new appointmnet
router.post("/", async (req, res) => {
  try {
    // Get the user data from the request body
    const { title, date, time, insurance, user, name } = req.body;

    // Create a new user document with the hashed password
    const newApp = await Appointments.create({
      title: title,
      date: date,
      time: time,
      insurance: insurance,
      user: user,
      name: name
    });

    // Return the new app document as the response
    res.json(newApp);
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error(error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// Route for updating an existing appointment
router.patch("/", (req, res) => {
  // TODO: Implement apoointment update logic
});

// Route for deleting an apoointment by ID
router.delete("/:id", (req, res) => {
  // TODO: Implement apoointment deletion logic
});

// Export the router module
module.exports = router;
