// Import views for each route
import Dashboard from "./views/Dashboard.js";
import Login, { loginn } from "./views/Login.js";
import Appointments, { setLoggedIn } from "./views/Appointments.js";
import { edit } from "./script.js";
import { addAppointment } from "./appointments.js";
import { updateAppointment } from "./appointments.js";
import { deleteAppointment } from "./appointments.js";
import { clearValues } from "./script.js";

// Function to convert path to regex pattern
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// Function to navigate to a new URL and call router to update the view
export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// Function to extract parameters from the URL match
const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// Function to update the view based on the current URL
const router = async () => {
  // Define routes and their associated views
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/login", view: Login },
    { path: "/app", view: Appointments },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  // Find the first match that is not null
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // If no match found, default to the first route
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  // Instantiate the view with the parameters extracted from the URL match
  const view = new match.route.view(getParams(match));

  // Render the view HTML to the app container
  document.getElementById("app").innerHTML = await view.getHtml();
};

// Call router function when back/forward buttons are clicked
window.addEventListener("popstate", router);

// Call router function when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Listen for clicks on links and navigate to the associated URL
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
    // Listen for clicks on login, register, and logout buttons
    if (e.target.matches("[login-button]")) {
      e.preventDefault();
      loginn(e);
    }
    if (e.target.matches("[register-button]")) {
      e.preventDefault();
      addUser();
    }
    if (e.target.matches("[logout-button]")) {
      e.preventDefault();
      // Set loggedIn to false and navigate to logout URL
      setLoggedIn(false);
      navigateTo(e.target.href);
    }
    if (e.target.matches("[edit-button]")) {
      e.preventDefault();
      // Set loggedIn to false and navigate to logout URL
      edit();
    }
    if (e.target.matches("[edit-save-button]")) {
      e.preventDefault();
      updateAppointment();
      clearValues();
    }
    if (e.target.matches("[add-save-button]")) {
      e.preventDefault();
      addAppointment();
      clearValues();
    }
    if (e.target.matches("[delete-save-button]")) {
      e.preventDefault();
      deleteAppointment();
      clearValues();
    }
  });
  // Call router function to render initial view
  router();
});

function addUser() {
  var username = document.getElementById("new-username").value;
  const roleSelector = document.getElementById("roleSelector");
  const selectedOption = roleSelector.options[roleSelector.selectedIndex];
  const selectedRole = selectedOption.textContent;

  console.log(selectedRole);
  var password = document.getElementById("confirm-password").value;

  $.ajax({
    url: "http://localhost:3000/users",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: username,
      role: selectedRole,
      password: password,
    }),
    success: function (data) {
      console.log("User created successfully:", data);
      alertSuccess();
    },
    error: function (jqXHR) {
      console.log(jqXHR);
      if (
        jqXHR.status === 400 &&
        jqXHR.responseJSON &&
        jqXHR.responseJSON.error === "Username already exists"
      ) {
        console.log("Username already exists");
        alertExists();
      } else {
        console.log("Failed to create user.");
      }
    },
  });
}

function alertExists() {
  const alertPlaceholder = document.getElementById("usernameExists");

  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  alert("Benutzername existiert bereits!", "danger");
}

function alertSuccess() {
  const alertPlaceholder = document.getElementById("usernameCreated");

  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  alert("Benutzer wurde erfolgreich angelegt!", "success");
}
