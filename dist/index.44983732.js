function edit() {
    // Get the row with the "table-active" class
    const activeRow = document.querySelector(".table-active");
    // Get the values of the cells in the active row
    const date = activeRow.cells[1].innerText;
    const [day, month, year] = date.split(".");
    const isoDateString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const time = activeRow.cells[2].innerText;
    const title = activeRow.cells[3].innerText;
    const insurance = activeRow.cells[4].innerText;
    const cName = activeRow.cells[5].innerText;
    console.log(date);
    // Do something with the values (e.g. populate form fields)
    document.getElementById("dateEdit").value = isoDateString;
    document.getElementById("timeEdit").value = time;
    document.getElementById("titleEdit").value = title;
    document.getElementById("cNameEdit").value = cName;
    if (insurance === "privat") document.querySelector("#insuranceEdit option[value='1']").selected = true;
    else document.querySelector("#insuranceEdit option[value='2']").selected = true;
}
function clearValues() {
    // reset my the Form where a User is added
    const formAddUser = document.getElementById("addUserForm");
    formAddUser.reset();
    // reset my the Form where a User is Logged in
    const formLoginUser = document.getElementById("formLoginUser");
    formLoginUser.reset();
    // reset my the Form where a Appointment is added
    const formAddAppointment = document.getElementById("formAddAppointment");
    formAddAppointment.reset();
    // reset my the Form where a Appointment is edited
    const formEditAppointment = document.getElementById("formEditAppointment");
    formEditAppointment.reset();
}
function deleteTable() {
    $("#terminTable").remove();
}
function activeTable() {
    // Attach click event listener to each row
    $(document).on("click", "#terminTable tbody tr", function() {
        // Remove the 'table-active' class from all rows except the clicked one
        $("#terminTable tbody tr").not(this).removeClass("table-active");
        // Add the 'table-active' class to the clicked row
        $(this).addClass("table-active");
        // Show the adminPanel div if the user is an admin
        checkAdmin();
        // Get the values from the selected row
        var cells = $(this).find("td");
        var title = cells.eq(2).text();
        var date = cells.eq(0).text();
        var time = cells.eq(1).text();
        var insurance = cells.eq(3).text();
    });
}

//# sourceMappingURL=index.44983732.js.map
