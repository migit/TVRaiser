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
  var card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(cardSize);
  card.innerHTML = `
    <div class="card-header">
      <i class="${cardIcon}"></i>
      <h2>${cardHeader}</h2>
    </div>
    <div class="card-content">
      <p>${cardContent}</p>
    </div>
    <div class="card-footer">
      <button class="${cardAnimation}">${cardFunction}</button>
    </div>
  `;
  cardContainer.appendChild(card);

  // Close the modal
  createCardModal.style.display = "none";
});
