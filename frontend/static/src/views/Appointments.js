// This imports the Abstractview class from a different file and a function called checkAdmin from another file called appointments.js
import Abstractview from "./Abstractview.js";
import { checkAdmin } from "../appointments.js";

// These two variables are used to track if a user is logged in and their username
let isLoggedIn = false;
let userName;

// This exports a default class that extends the Abstractview class
export default class extends Abstractview {
  // The constructor function takes in a parameter called "params"
  constructor(params) {
    // The constructor of the parent class is called with the "params" parameter
    super(params);
    // The title of the HTML document is set to "Appointments"
    this.setTitle("Appointments");
  }

  // This function returns HTML content wrapped in a Promise
  async getHtml() {
    // Check if the user is logged in
    if (!getLoggedIn()) {
      // If the user is not logged in, fetch the content of a "notLoggedIn" HTML file and return it
      const response = await fetch("/static/src/notLoggedIn.html");
      const htmlContent = await response.text();
      return htmlContent;
    }

    // If the user is logged in, fetch the content of an "appointments" HTML file and return it
    const response = await fetch("/static/src/appointments.html");
    const htmlContent = await response.text();
    // Call the onViewLoaded() function once the view is loaded
    this.onViewLoaded();
    return htmlContent;
  }

  // This function is called once the view is loaded
  async onViewLoaded() {
    // Log the username to the console
    console.log(userName);
    // Call the checkAdmin() function with the username parameter
    loadTable(userName);
  }
}

// This function calls the checkAdmin() function with the username parameter
export function loadTable(username) {
  checkAdmin(username);
}

// This function sets the value of the "userName" variable to the "username" parameter
export function setUsername(username) {
  userName = username;
}

// This function sets the value of the "isLoggedIn" variable to the "value" parameter
export function setLoggedIn(value) {
  console.log("WAHR" + value);
  isLoggedIn = value;
}

// This function returns the value of the "isLoggedIn" variable
function getLoggedIn() {
  return isLoggedIn;
}
