function addAppointment() {
  const title = document.getElementById("title").value;

  // Get the date input element by its id
  const dateInput = document.getElementById("date");
  // Get the date value from the input field
  const dateValue = new Date(dateInput.value);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const germanDateString = dateValue.toLocaleDateString("de-DE", options);

  const [day, month, year] = germanDateString.split(".");
  const date = new Date(`${year}-${month}-${day}`);

  // Get the time input element by its id
  const timeInput = document.getElementById("time");

  // Get the time value from the input field
  const timeValue = timeInput.value;

  // Get the insurance input element by its id
  const appSelector = document.getElementById("insuranceAdd");
  const selectedApp = appSelector.options[appSelector.selectedIndex];
  const appointment = selectedApp.textContent;

  console.log(title);
  console.log(date);
  console.log(timeValue);
  console.log(appointment);
  console.log("maticmar");
  console.log("Marcel Matic");

  $.ajax({
    url: "http://localhost:3000/appointments",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      title: title,
      date: formattedDate,
      time: timeValue,
      insurance: appointment,
      user: "maticmar",
      name: "Marcel Matic",
    }),
    success: function (data) {
      console.log("Appointment created successfully:", data);
    },
    error: function () {
      console.log("Failed to create appointment.");
    },
  });

  clearValues();
}

function loadTableUser(username) {
  // Delete any existing table before creating a new one
  $("#terminTable").remove();
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
    },
    error: function () {
      console.log("Failed to retrieve entries from API.");
    },
  });

  activeTable();
}

function loadTableArztAdmin() {
  // Delete any existing table before creating a new one
  $("#terminTable").remove();
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

        const dateString = entry.date;
        const date = new Date(dateString);
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const formattedDate = date.toLocaleDateString("de-DE", options);
        console.log(formattedDate);
        row.append($("<td>").text(formattedDate));
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
