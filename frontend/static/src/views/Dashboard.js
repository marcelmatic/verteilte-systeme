// This imports the Abstractview class from a different file
import Abstractview from "./Abstractview.js";

// This exports a default class that extends the Abstractview class
export default class extends Abstractview {
  // The constructor function takes in a parameter called "params"
  constructor(params) {
    // The constructor of the parent class is called with the "params" parameter
    super(params);
    // The title of the HTML document is set to "Home"
    this.setTitle("Home");
  }

  // This function returns HTML content wrapped in a Promise
  async getHtml() {
    // Fetch the content of a "home" HTML file and return it
    const response = await fetch("/static/src/home.html");
    const htmlContent = await response.text();
    return htmlContent;
  }
}
