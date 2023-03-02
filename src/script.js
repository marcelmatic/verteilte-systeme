//const userId = req.user.id; // Assuming you have the user ID in your request object
//const user = await User.findById(userId); // Assuming you are using Mongoose
//const role = user.role; // Assuming "role" is the name of the field that contains the user's role in your user document
//const isAdmin = role === "admin"; // Set isAdmin to true if the user's role is "admin", false otherwise
var title;
var date;
var time;
var insurance;

function checkAdmin() {
  var username = document
    .getElementById("userLoginDisplayName")
    .textContent.split(" ")[1];
  console.log(username);
  $.ajax({
    url: "http://localhost:3000/users/" + username,
    method: "GET",
    success: function (data) {
      if (data.username === username) {
        // The user was found and has the correct username
        if (data.role === "admin") {
          // The user is an admin
          const adminPanel = document.getElementById("adminPanel");
          adminPanel.classList.toggle("d-none", false);
          clearValues();
        }
      }
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });
}

function anmelden() {
  console.log("anmelden");

  var username = document.getElementById("username").value;
  console.log(username);
  var password = document.getElementById("password").value;
  console.log(password);

  $.ajax({
    url: "http://localhost:3000/users",
    method: "GET",
    success: function (data) {
      var foundUser = false;
      $.each(data, function (index, user) {
        console.log(user.username);
        if (user.username === username && user.password === password) {
          foundUser = true;
          // Do something to indicate that the user is logged in, e.g. redirect to a dashboard page
          const listDiv = document.getElementById("listDiv");
          listDiv.classList.toggle("d-none", false);

          const loginDiv = document.getElementById("loginDiv");
          loginDiv.classList.toggle("d-none", true);

          document.getElementById("username").value = "";
          document.getElementById("password").value = "";

          document.getElementById("userLoginDisplayName").innerHTML =
            "Willkommen " + user.username;

          console.log(user.role);

          if (user.role === "kunde") {
            console.log("LOAD USER TABLE");
            loadTableUser(user.username);
          } else {
            console.log("LOAD ADMIN TABLE");
            loadTableArztAdmin();
          }
          clearValues();
          return false; // Break out of the loop once a matching user is found
        }
      });
      if (!foundUser) {
        alert("Invalid username or password.");
      }
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });
}

function abmelden() {
  console.log("abmelden");
  const listDiv = document.getElementById("listDiv");
  listDiv.classList.toggle("d-none", true);

  const loginDiv = document.getElementById("loginDiv");
  loginDiv.classList.toggle("d-none", false);

  const adminPanel = document.getElementById("adminPanel");
  adminPanel.classList.toggle("d-none", true);
}

function edit() {
  // Get the row with the "table-active" class
  const activeRow = document.querySelector(".table-active");

  // Get the values of the cells in the active row
  const date = activeRow.cells[0].innerText;
  const time = activeRow.cells[1].innerText;
  const title = activeRow.cells[2].innerText;
  const insurance = activeRow.cells[3].innerText;

  // Do something with the values (e.g. populate form fields)
  document.getElementById("dateEdit").value = date;
  document.getElementById("timeEdit").value = time;
  document.getElementById("titleEdit").value = title;
  document.getElementById("insranceEdit").value = insurance;
}

function addUser() {
  var username = document.getElementById("new-username").value;
  var role = document.getElementById("user-type").value;
  var password = document.getElementById("confirm-password").value;

  console.log(username);
  console.log(role);
  console.log(password);

  $.ajax({
    url: "http://localhost:3000/users",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: username,
      role: role,
      password: password,
    }),
    success: function (data) {
      console.log("User created successfully:", data);
    },
    error: function () {
      console.log("Failed to create user.");
    },
  });

  clearValues();
}

function clearValues() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  document.getElementById("insurance").value = "";

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  document.getElementById("new-username").value = "";
  document.getElementById("user-type").value = "";
  document.getElementById("new-password").value = "";
  document.getElementById("confirm-password").value = "";
}

function deleteTable() {
  $("#terminTable").remove();
}

function loadTableUser(username) {
  // Delete any existing table before creating a new one
  deleteTable();
  // Make a GET request to retrieve all entries from your appointments collection
  $.ajax({
    url: "http://localhost:3000/appointments/" + username,
    method: "GET",
    success: function (data) {
      // Create an HTML table element with headers
      var table = $("<table>").addClass("table").attr("id", "terminTable");
      var headerRow = $("<tr>");
      headerRow.append($("<th>").text("Datum"));
      headerRow.append($("<th>").text("Uhrzeit"));
      headerRow.append($("<th>").text("Terminart"));
      headerRow.append($("<th>").text("Versicherung"));
      table.append($("<thead>").append(headerRow));

      // Loop through the list of objects and create a table row for each entry
      var tbody = $("<tbody>");
      $.each(data, function (i, entry) {
        var row = $("<tr>");
        row.append($("<td>").text(entry.date));
        row.append($("<td>").text(entry.time));
        row.append($("<td>").text(entry.title));
        row.append($("<td>").text(entry.insurance));
        tbody.append(row);
      });
      table.append(tbody);

      // Add the table to the desired location in your HTML document
      $("#Terminliste").append(table);
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });

  activeTable();
}

function loadTableArztAdmin() {
  // Delete any existing table before creating a new one
  deleteTable();
  // Make a GET request to retrieve all entries from your appointments collection
  $.ajax({
    url: "http://localhost:3000/appointments",
    method: "GET",
    success: function (data) {
      // Create an HTML table element with headers
      var table = $("<table>").addClass("table").attr("id", "terminTable");
      var headerRow = $("<tr>");
      headerRow.append($("<th>").text("Datum"));
      headerRow.append($("<th>").text("Uhrzeit"));
      headerRow.append($("<th>").text("Terminart"));
      headerRow.append($("<th>").text("Versicherung"));
      headerRow.append($("<th>").text("Patient"));
      table.append($("<thead>").append(headerRow));

      // Loop through the list of objects and create a table row for each entry
      var tbody = $("<tbody>");
      $.each(data, function (i, entry) {
        var row = $("<tr>");
        row.append($("<td>").text(entry.date));
        row.append($("<td>").text(entry.time));
        row.append($("<td>").text(entry.title));
        row.append($("<td>").text(entry.insurance));
        row.append($("<td>").text(entry.name));
        tbody.append(row);
      });
      table.append(tbody);

      // Add the table to the desired location in your HTML document
      $("#Terminliste").append(table);
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });

  activeTable();
}

function activeTable() {
  // Attach click event listener to each row
  $(document).on("click", "#terminTable tbody tr", function () {
    // Remove the 'table-active' class from all rows except the clicked one
    $("#terminTable tbody tr").not(this).removeClass("table-active");

    // Add the 'table-active' class to the clicked row
    $(this).addClass("table-active");

    // Show the adminPanel div if the user is an admin
    checkAdmin();

    // Get the values from the selected row
    var cells = $(this).find("td");
    var title = cells.eq(2).text();
    console.log(title);
    var date = cells.eq(0).text();
    console.log(date);
    var time = cells.eq(1).text();
    console.log(time);
    var insurance = cells.eq(3).text();
    console.log(insurance);
  });
}
