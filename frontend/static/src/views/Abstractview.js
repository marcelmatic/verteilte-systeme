// This exports a default class that can be used elsewhere in your code
export default class {

  // The constructor function takes in a parameter called "params"
  constructor(params) {
    // The "params" parameter is stored as a property of the class instance
    this.params = params;
    // A message containing the value of "params" is logged to the console
    console.log(params);
  }

  // This function takes in a "title" parameter and sets the title of the current HTML document
  setTitle(title) {
    document.title = title;
  }

  // This function returns an empty string wrapped in a Promise
  async getHtml() {
    return "";
  }
}
