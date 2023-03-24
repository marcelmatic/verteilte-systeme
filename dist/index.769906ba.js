function anmelden() {
    var username = document.getElementById("username").value;
    console.log(username);
    var password = document.getElementById("password").value;
    console.log(password);
    $.ajax({
        url: "http://localhost:3000/users/login",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function(data) {
            const user = data;
            console.log(user.username);
            // Do something to indicate that the user is logged in
            const listDiv = document.getElementById("listDiv");
            listDiv.classList.toggle("d-none", false);
            const loginDiv = document.getElementById("loginDiv");
            loginDiv.classList.toggle("d-none", true);
            document.getElementById("userLoginDisplayName").value = user.username;
            if (user.role === "user") {
                console.log("LOAD USER TABLE");
                loadTableUser(user.username);
            } else {
                console.log("LOAD ADMIN TABLE");
                loadTableArztAdmin();
            }
            clearValues();
        },
        error: function() {
            alert("Invalid username or password.");
            console.log("Failed to log in.");
        }
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
            password: password
        }),
        success: function(data) {
            console.log("User created successfully:", data);
            alertSuccess();
            clearValues();
        },
        error: function(jqXHR) {
            console.log(jqXHR);
            if (jqXHR.status === 400 && jqXHR.responseJSON && jqXHR.responseJSON.error === "Username already exists") {
                console.log("Username already exists");
                alertExists();
            } else console.log("Failed to create user.");
        }
    });
}
function alertExists() {
    const alertPlaceholder = document.getElementById("usernameExists");
    const alert1 = (message, type)=>{
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            "</div>"
        ].join("");
        alertPlaceholder.append(wrapper);
    };
    alert1("Benutzername existiert bereits!", "danger");
}
function alertSuccess() {
    const alertPlaceholder = document.getElementById("usernameCreated");
    const alert1 = (message, type)=>{
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            "</div>"
        ].join("");
        alertPlaceholder.append(wrapper);
    };
    alert1("Benutzer wurde erfolgreich angelegt!", "success");
}
function checkAdmin() {
    var username = document.getElementById("userLoginDisplayName").value;
    $.ajax({
        url: "http://localhost:3000/users/" + username,
        method: "GET",
        success: function(data) {
            if (data.username === username) // The user was found and has the correct username
            {
                if (data.role === "admin") {
                    // The user is an admin
                    const adminPanel = document.getElementById("adminPanel");
                    adminPanel.classList.toggle("d-none", false);
                    clearValues();
                }
            }
        },
        error: function() {
            console.log("Failed to retrieve entries from API.");
        }
    });
}

//# sourceMappingURL=index.769906ba.js.map
