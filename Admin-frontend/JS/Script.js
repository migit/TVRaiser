// Get the modal element
var createCardModal = document.getElementById("create-card-modal");

// Get the button that opens the modal
var createCardBtn = document.getElementById("create-card-btn");

// Get the <span> element that closes the modal
var createCardCloseBtn = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
createCardBtn.onclick = function () {
  createCardModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
createCardCloseBtn.onclick = function () {
  createCardModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == createCardModal) {
    createCardModal.style.display = "none";
  }
};

// Handle card creation form submission
var createCardForm = document.getElementById("create-card-form");
createCardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var cardHeader = document.getElementById("card-header").value;
  var cardContent = document.getElementById("card-content").value;
  var cardSize = document.getElementById("card-size").value;
  var cardIcon = document.getElementById("card-icon").value;
  var cardAnimation = document.getElementById("card-animation").value;
  var cardFunction = document.getElementById("card-function").value;

  // Create the card with the entered values and add it to the card container
  var cardContainer = document.getElementById("card-container");

  // Close the modal
  createCardModal.style.display = "none";
});

// Get all links in the navigation bar
const links = document.querySelectorAll("nav ul li a");

// Loop through each link and add an event listener
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the ID of the section to show
    const id = link.getAttribute("href");

    // Hide all sections
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
    });

    // Show the selected section
    document.querySelector(id).style.display = "flex";
  });
});

// dropdown menu
const dropdownButton = document.querySelector(".dropdown-button");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});

window.addEventListener("click", (event) => {
  if (!event.target.matches(".dropdown-button")) {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }
  }
});

//User account code
// Add an event listener to the Add User button
document.getElementById("add-user-btn").addEventListener("click", function () {
  // Show the Add User modal
  document.getElementById("add-user-modal").style.display = "block";
});

// Add an event listener to the modal's close button
document.querySelector(".close").addEventListener("click", function () {
  // Hide the Add User modal
  document.getElementById("add-user-modal").style.display = "none";
});

// Add an event listener to the form's submit button
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validate the form data
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Send a request to the server to add the new user
  fetch("/addUser", {
    method: "POST",
    body: JSON.stringify({ username, role, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // If the server returns a success message, create a new row for the user in the table
      if (data.success) {
        const table = document.querySelector("table tbody");
        const newRow = table.insertRow();

        // Add the user data to the new row
        const usernameCell = newRow.insertCell(0);
        const roleCell = newRow.insertCell(1);
        const actionCell = newRow.insertCell(2);
        usernameCell.innerHTML = username;
        roleCell.innerHTML = role;
        actionCell.innerHTML =
          '<button class="button">Edit</button>' +
          '<button class="button">Delete</button>';

        // Hide the Add User modal
        document.getElementById("add-user-modal").style.display = "none";

        // Reset the form
        document.querySelector("form").reset();
      } else {
        // If the server returns an error message, display it to the user
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while trying to add the user.");
    });
});

//settings code
// Set default language to English
let language = "en";

// Set default theme to light
let theme = "light";

// Set default frontend color to blue
let frontendColor = "#007bff";

// Language selection event listener
document
  .getElementById("language-select")
  .addEventListener("change", function () {
    language = this.value;
    // Implement code to change language here
  });

// Theme selection event listener
document.getElementById("theme-select").addEventListener("change", function () {
  theme = this.value;
  // Implement code to change theme here
});

// Frontend color customization event listener
document.getElementById("color-picker").addEventListener("change", function () {
  frontendColor = this.value;
  // Implement code to change frontend color here
});

// Generate theme based on color
function generateTheme(color) {
  // Implement code to generate theme based on color here
}
