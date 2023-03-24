export function edit() {
  // Get the row with the "table-active" class
  const activeRow = document.querySelector(".table-active");
  

  // Get the values of the cells in the active row
  const date = activeRow.cells[1].innerText;
  const [day, month, year] = date.split(".");
  const isoDateString = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;

  const time = activeRow.cells[2].innerText;
  const title = activeRow.cells[3].innerText;
  const insurance = activeRow.cells[4].innerText;
  const cName = activeRow.cells[5].innerText;

  console.log(date);

 

  document.getElementById("dateEdit").value = isoDateString;
  document.getElementById("timeEdit").value = time;
  document.getElementById("titleEdit").value = title;
  document.getElementById("cNameEdit").value = cName;

  if (insurance === "privat") {
    document.querySelector("#insuranceEdit option[value='1']").selected = true;
  } else {
    document.querySelector("#insuranceEdit option[value='2']").selected = true;
  }
}

export function clearValues() {
  // reset my the Form where a Appointment is added
  const formAddAppointment = document.getElementById("formAddAppointment");
  formAddAppointment.reset();

  // reset my the Form where a Appointment is edited
  const formEditAppointment = document.getElementById("formEditAppointment");
  formEditAppointment.reset();
}
