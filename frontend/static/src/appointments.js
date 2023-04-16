let uName;
let userRole;

//TOKAR
export function checkAdmin(username) {
  uName = username;

  $.ajax({
    url: "http://localhost:3000/users/" + username,
    method: "GET",
    success: function (data) {
      if (data.username === username) {
        // The user was found and has the correct username
        if (data.role === "admin") {
          userRole = "admin";
          // The user is an admin
          loadTableArztAdmin(username);
        } else if (data.role === "doctor") {
          userRole = "doctor";
          // The user is an admin
          loadTableArztAdmin(username);
        } else {
          userRole = "user";
          loadTableUser(username);
        }

        togglePanels();
      }
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });
}

export function togglePanels() {
  const aPanel = document.getElementById("adminPanel");
  const dPanel = document.getElementById("doctorPanel");
  const uPanel = document.getElementById("userPanel");

  if (userRole === "admin") {
    aPanel.classList.remove("d-none");
    dPanel.classList.add("d-none");
    uPanel.classList.add("d-none");
  } else if (userRole === "doctor") {
    dPanel.classList.remove("d-none");
    aPanel.classList.add("d-none");
    uPanel.classList.add("d-none");
  } else if (userRole === "user") {
    uPanel.classList.remove("d-none");
    dPanel.classList.add("d-none");
    aPanel.classList.add("d-none");
  }
}

export function addAppointment() {
  // Get the title input element by its id
  const title = document.getElementById("title").value;

  // Get the date input element by its id
  const dateInput = document.getElementById("date");
  const dateValue = new Date(dateInput.value);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const germanDateString = dateValue.toLocaleDateString("de-DE", options);
  const [day, month, year] = germanDateString.split(".");
  const date = new Date(`${year}-${month}-${day}`);

  // Get the time input element by its id
  const timeInput = document.getElementById("time");
  const timeValue = timeInput.value;

  // Get the insurance input element by its id
  const appSelector = document.getElementById("insuranceAdd");
  const selectedApp = appSelector.options[appSelector.selectedIndex];
  const appointment = selectedApp.textContent;

  const username = uName;

  //get the customer name by it's id
  const cName = document.getElementById("cName").value;

  console.log(title);
  console.log(dateInput);
  console.log(timeValue);
  console.log(appointment);
  console.log(username);
  console.log(cName);

  $.ajax({
    url: "http://localhost:3000/appointments",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      title: title,
      date: date,
      time: timeValue,
      insurance: appointment,
      user: username,
      name: cName,
    }),
    success: function (data) {
      console.log("Appointment created successfully:", data);
      setTimeout(function () {
        checkAdmin(username);
      }, 1000);
    },
    error: function () {
      console.log("Failed to create appointment.");
    },
  });
}

export function deleteAppointment() {
  // Get the row with the "table-active" class
  const activeRow = document.querySelector(".table-active");

  const username = uName;

  // Get the values of the cells in the active row
  const _id = activeRow.cells[0].innerText;

  $.ajax({
    url: "http://localhost:3000/appointments/" + _id,
    method: "DELETE",
    success: function (data) {
      console.log("Appointment deleted successfully:", data);
      HideButtons();

      setTimeout(function () {
        checkAdmin(username);
      }, 1000);
    },
    error: function () {
      console.log("Failed to delete appointment.");
    },
  });
}

export function updateAppointment() {
  // Get the row with the "table-active" class
  const activeRow = document.querySelector(".table-active");

  const username = uName;

  // Get the values of the cells in the active row
  const _id = activeRow.cells[0].innerText;

  // Get the title input element by its id
  const title = document.getElementById("titleEdit").value;

  // Get the date input element by its id
  const dateInput = document.getElementById("dateEdit");
  const dateValue = new Date(dateInput.value);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const germanDateString = dateValue.toLocaleDateString("de-DE", options);
  const [day, month, year] = germanDateString.split(".");
  const date = new Date(`${year}-${month}-${day}`);

  // Get the time input element by its id
  const timeInput = document.getElementById("timeEdit");
  const time = timeInput.value;

  // Get the insurance input element by its id
  const appSelector = document.getElementById("insuranceEdit");
  const selectedApp = appSelector.options[appSelector.selectedIndex];
  const insurance = selectedApp.textContent;

  //get the customer name by it's id
  const name = document.getElementById("cNameEdit").value;

  $.ajax({
    url: "http://localhost:3000/appointments/" + _id,
    method: "PATCH",
    contentType: "application/json",
    data: JSON.stringify({
      title: title,
      date: date,
      time: time,
      insurance: insurance,
      name: name,
    }),
    success: function (data) {
      console.log("Appointment updated successfully:", data);
      HideButtons();
      setTimeout(function () {
        checkAdmin(username);
      }, 1000);
    },
    error: function () {
      console.log("Failed to update appointment.");
    },
  });
}

export function loadTableUser(username) {
  // Delete any existing table before creating a new one
  $("#terminTable").remove();
  // Make a GET request to retrieve all entries from your appointments collection
  $.ajax({
    url: "http://localhost:3000/appointments/" + username,
    method: "GET",
    success: function (data) {
      if (data) {
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
          const dateString = entry.date;
          const date = new Date(dateString);
          const options = { year: "numeric", month: "2-digit", day: "2-digit" };
          const formattedDate = date.toLocaleDateString("de-DE", options);
          console.log(formattedDate);
          row.append($("<td>").text(formattedDate));
          row.append($("<td>").text(entry.time));
          row.append($("<td>").text(entry.title));
          row.append($("<td>").text(entry.insurance));
          tbody.append(row);
        });
        table.append(tbody);

        // Add the table to the desired location in your HTML document
        $("#Terminliste").append(table);
      }
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });

  activeTable();
}

export function loadTableArztAdmin() {
  // Delete any existing table before creating a new one
  $("#terminTable").remove();
  // Make a GET request to retrieve all entries from your appointments collection
  $.ajax({
    url: "http://localhost:3000/appointments",
    method: "GET",
    success: function (data) {
      // Create an HTML table element with headers
      if (data) {
        var table = $("<table>").addClass("table").attr("id", "terminTable");
        var headerRow = $("<tr>");
        headerRow.append($("<th>").addClass("d-none").text("ID")); // Add "d-none d-md-table-cell" classes to hide the column
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

          const _id = entry._id;
          const dateString = entry.date;
          const date = new Date(dateString);
          const options = { year: "numeric", month: "2-digit", day: "2-digit" };
          const formattedDate = date.toLocaleDateString("de-DE", options);
          row.append($("<td>").addClass("d-none").text(_id)); // Add "d-none d-md-table-cell" classes to hide the column
          row.append($("<td>").text(formattedDate));
          row.append($("<td>").text(entry.time));
          row.append($("<td>").text(entry.title));
          row.append($("<td>").text(entry.insurance));
          row.append($("<td>").text(entry.name));
          tbody.append(row);
        });
        table.append(tbody);

        console.log("MEINUSERNAME:" + uName);

        // Add the table to the desired location in your HTML document
        $("#Terminliste").append(table);
      }
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });

  activeTable();
}

export function activeTable() {
  // Attach click event listener to each row
  $(document).on("click", "#terminTable tbody tr", function () {
    // Remove the 'table-active' class from all rows except the clicked one
    $("#terminTable tbody tr").not(this).removeClass("table-active");

    // Add the 'table-active' class to the clicked row
    $(this).addClass("table-active");

    ShowButtons();
  });
}

export function ShowButtons() {
  if (userRole === "admin") {
    var editBtn = document.getElementById("btnEdit");
    editBtn.disabled = false;
    var deleteBtn = document.getElementById("btnDelete");
    deleteBtn.disabled = false;
  } else if (userRole === "doctor") {
    console.log("activate cancel button");
    var finishedBtn = document.getElementById("btnFinished");
    finishedBtn.disabled = false;
  } else if (userRole === "user") {
    var cancelBtn = document.getElementById("btnCancelUser");
    cancelBtn.disabled = false;

    var editBtnUser = document.getElementById("btnEditUser");
    editBtnUser.disabled = false;
  }
}

export function HideButtons() {
  if (userRole === "admin") {
    var editBtn = document.getElementById("btnEdit");
    editBtn.disabled = true;
    var deleteBtn = document.getElementById("btnDelete");
    deleteBtn.disabled = true;
  } else if (userRole === "doctor") {
    console.log("activate cancel button");
    var finishedBtn = document.getElementById("btnFinished");
    finishedBtn.disabled = true;
  } else if (userRole === "user") {
    var cancelBtn = document.getElementById("btnCancelUser");
    cancelBtn.disabled = true;

    var editBtnUser = document.getElementById("btnEditUser");
    editBtnUser.disabled = true;
  }
}
