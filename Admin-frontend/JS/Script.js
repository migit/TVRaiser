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
