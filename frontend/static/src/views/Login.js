// This imports the Abstractview class from a different file, the Appointments class and two functions from another file called Appointments.js, and a function called navigateTo from a different file called index.js
import Abstractview from "./Abstractview.js";
import Appointments, { setUsername, setLoggedIn } from "./Appointments.js";
import { navigateTo } from "../index.js";

// This exports a default class that extends the Abstractview class
export default class extends Abstractview {
  // The constructor function takes in a parameter called "params"
  constructor(params) {
    // The constructor of the parent class is called with the "params" parameter
    super(params);
    // The title of the HTML document is set to "Login"
    this.setTitle("Login");
  }

  // This function returns HTML content wrapped in a Promise
  async getHtml() {
    // Fetch the content of a "login" HTML file and return it
    const response = await fetch("/static/src/login.html");
    const htmlContent = await response.text();
    return htmlContent;
  }
}

// This function is called when the login form is submitted
export function loginn(e) {
  // Get the username and password from the login form
  var username = document.getElementById("username").value;
  console.log(username);
  var password = document.getElementById("password").value;
  console.log(password);

  // Send a POST request to the login API endpoint
  $.ajax({
    url: "http://localhost:3000/users/login",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: JSON.stringify({
      username: username,
      password: password,
    }),
    success: function (data) {
      // If the login is successful, set the isLoggedIn variable to true, navigate to the Appointments page, and set the username
      const user = data;
      console.log("SUIII");
      setLoggedIn(true);
      navigateTo(e.target.href);
      setUsername(data.username);
    },
    error: function () {
      // If the login is unsuccessful, show an alert and log an error message to the console
      alert("Invalid username or password.");
      console.log("Failed to log in.");
    },
  });
}
