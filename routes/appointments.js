// Import necessary dependencies
const express = require("express"); // Import the Express library
const router = express.Router(); // Create a new router instance
const Appointments = require("../models/appointments"); // Import the User model

// ## ROUTES FOR APPOINTMENTS ##

// Route for getting all appointments
router.get("/", async (req, res) => {
  try {
    // Find all appointments in the database
    const appointments = await Appointments.find().sort({ date: 1 });
    // Return the appointments object as JSON
    res.json(appointments);
  } catch (error) {
    // If an error occurs, return an error message and status code 500
    res.status(500).json({ message: error.message });
  }
});

// Route for getting appointments by username
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
    // Get the data from the request body
    const { title, date, time, insurance, user, name } = req.body;

    // Create a new user document with the hashed password
    const newApp = await Appointments.create({
      title: title,
      date: date,
      time: time,
      insurance: insurance,
      user: user,
      name: name,
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
router.patch("/:id", async (req, res) => {
  try {
    const appointment = await Appointments.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        insurance: req.body.insurance,
        name: req.body.name,
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for deleting an appointment by ID
router.delete("/:id", async (req, res) => {
  try {
    // Extract the appointment ID from the request parameters
    const appointmentId = req.params.id;

    // Call the deleteOne method to delete the appointment by ID
    const deleteResult = await Appointments.deleteOne({ _id: appointmentId });

    // Check if the appointment was deleted
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Return a success message
    return res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// Export the router module
module.exports = router;
