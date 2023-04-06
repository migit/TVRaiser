const cardFunctionSelect = document.getElementById("card-function");
const coffeeStatusFields = document.getElementById("coffee-status-fields");
const weatherStatusFields = document.getElementById("weather-status-fields");
const timeStatusFields = document.getElementById("time-status-fields");
const updateNotificationsFields = document.getElementById(
  "update-notifications-fields"
);
const createChartFields = document.getElementById("create-chart-fields");

cardFunctionSelect.addEventListener("change", (event) => {
  switch (event.target.value) {
    case "coffee-status":
      coffeeStatusFields.style.display = "block";
      weatherStatusFields.style.display = "none";
      timeStatusFields.style.display = "none";
      updateNotificationsFields.style.display = "none";
      createChartFields.style.display = "none";
      break;
    case "weather-status":
      coffeeStatusFields.style.display = "none";
      weatherStatusFields.style.display = "block";
      timeStatusFields.style.display = "none";
      updateNotificationsFields.style.display = "none";
      createChartFields.style.display = "none";
      break;
    case "time-status":
      coffeeStatusFields.style.display = "none";
      weatherStatusFields.style.display = "none";
      timeStatusFields.style.display = "block";
      updateNotificationsFields.style.display = "none";
      createChartFields.style.display = "none";
      break;
    case "update-notifications":
      coffeeStatusFields.style.display = "none";
      weatherStatusFields.style.display = "none";
      timeStatusFields.style.display = "none";
      updateNotificationsFields.style.display = "block";
      createChartFields.style.display = "none";
      break;
    case "create-chart":
      coffeeStatusFields.style.display = "none";
      weatherStatusFields.style.display = "none";
      timeStatusFields.style.display = "none";
      updateNotificationsFields.style.display = "none";
      createChartFields.style.display = "block";
      break;
    default:
      coffeeStatusFields.style.display = "none";
      weatherStatusFields.style.display = "none";
      timeStatusFields.style.display = "none";
      updateNotificationsFields.style.display = "none";
      createChartFields.style.display = "none";
  }
});
