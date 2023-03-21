//variables
var i = 0;
//Function to create main elements
function CreateMain() {
  //Create main div
  document.getElementById("main").innerHTML +=
    '<!-- SideBar --> <div class="w3-sidebar w3-bar-block w3-border-right w3-black w3-animate-left w3-top" style="display: none; z-index: 5" id="Sidebar" > <button onclick="SideB_Close()" id="SideBarClose" class="w3-bar-item w3-theme" > Close &times; </button> <a href="#" class="w3-bar-item w3-button">Main Page</a> <a href="#" class="w3-bar-item w3-button">Charts</a> <a href="#" class="w3-bar-item w3-button">Panorama</a> <a href="#" class="w3-bar-item w3-button">Tickets</a> <a href="#" class="w3-bar-item w3-button">Recreation</a> </div> <div id="Banner" class="w3-theme w3-top w3-margin-bottom"> <!-- "Hamburger" button --> <div class="w3-row"> <button id="MainSideBarButton" class="w3-button w3-theme w3-xxlarge w3-left-align" style="width: 70px" onclick="SideB_Open()" > ☰ </button> <div class="w3-center w3-rest"><h1>TVRaiser Monitor</h1></div> </div> </div> <div class="w3-overlay" onclick="SideB_Close()" style="cursor: pointer" id="myOverlay" ></div> <p></p> <!-- Main page --> <div id="CardHolder" class="w3-container"></div> <!-- Footer --> <div class="w3-container w3-theme-d5 w3-center w3-bottom"> <h5 style="margin-left: 130px; display: inline-block"> Property of TVRaiser some rights reserved </h5> <img src="images/qrcode.png" alt="QRcode" style=" width: 100px; height: 100px; float: right; margin-bottom: 10px; margin-top: 10px; " /> </div>';
}
//Function to create cards
function CreateCard(
  CardHeader,
  CardContent = [],
  CardSize,
  CardIcon,
  CardAnimation,
  CardFunction,
  FirsCardSlot,
  SecondCardSlot,
  ThirdCardSlot,
  FourthCardSlot
) {
  // handle empty variables
  if (CardHeader == null) {
    CardHeader = "Card Header";
  }
  if (CardContent == null) {
    CardContent = "Card Content";
  }
  if (CardSize == null) {
    CardSize = "w3-half";
  }
  if (CardIcon == null) {
    CardIcon = "";
  }
  //Convert CardSize variables to right format
  switch (CardSize) {
    case "None":
      CardIcon = "w3-hide";
      break;
    case "Small":
      CardSize = "w3-quarter";
      break;
    case "Medium":
      CardSize = "w3-third";
      break;
    case "Large":
      CardSize = "w3-half";
      break;
    case "XLarge":
      CardSize = "w3-twothird";
      break;
    case "XXLarge":
      CardSize = "w3-threequarter";
      break;
    case "XXXLarge":
      CardSize = "w3-full";
      break;
  }
  //Convert CardIcon variables to right format
  switch (CardIcon) {
    case "None":
      CardIcon = "";
      break;
    case "Info":
      CardIcon = "fa fa-info-circle";
      break;
    case "Warning":
      CardIcon = "fa fa-exclamation-triangle";
      break;
    case "Bell":
      CardIcon = "fa fa-bell";
      break;
    case "Clock":
      CardIcon = "fa fa-clock";
      break;
    case "Sun":
      CardIcon = "fa fa-sun";
      break;
    case "CoffeeMug":
      CardIcon = "fa fa-coffee";
      break;
    case "Calendar":
      CardIcon = "fa fa-calendar";
      break;
  }
  //Convert CardAnimation variables to right format
  switch (CardAnimation) {
    case "None":
      CardAnimation = "";
      break;
    case "Pulse":
      CardAnimation = "fa-pulse ";
      break;
    case "Fade":
      CardAnimation = "fa-fade";
      break;
    case "Beat":
      CardAnimation = "fa-beat";
      break;
    case "Bounce":
      CardAnimation = "fa-bounce";
      break;
    case "Spin":
      CardAnimation = "fa-spin";
      break;
    case "Shake":
      CardAnimation = "fa-shake";
      break;
  }
  //Used to create card div
  let IdText = CardHeader.replace(/ /g, "_");
  document.getElementById("CardHolder").innerHTML +=
    '<div id="' +
    IdText +
    "_Card" +
    '" class="w3-card-4 w3-round-large w3-margin ' +
    CardSize +
    ' "> <header id="' +
    IdText +
    "_Card_header" +
    '" class="w3-container w3-theme w3-round-large"> <h1 id="' +
    IdText +
    "_Card_title" +
    '">' +
    CardHeader +
    '</h1> <p style = "margin-left: 80px;" id="' +
    IdText +
    "_Card_icon" +
    '" class="' +
    CardIcon +
    " " +
    CardAnimation +
    ' w3-margin w3-jumbo"></p> </header> <div id="' +
    IdText +
    "_Card_container" +
    '" class="w3-container"> </div> </div> </div>';
  //Used to create card content
  CardContent.forEach((element) => {
    document.getElementById(IdText + "_Card_container").innerHTML +=
      "<p id=" + IdText + "_Card_content_" + i + ">" + CardContent[i] + "</p>";
    i++;
  });
  i = 0;
  //Used to create card slots
  FirsCardSlot = IdText + "_Card_content_" + FirsCardSlot;
  SecondCardSlot = IdText + "_Card_content_" + SecondCardSlot;
  ThirdCardSlot = IdText + "_Card_content_" + ThirdCardSlot;
  FourthCardSlot = IdText + "_Card_content_" + FourthCardSlot;
  //used to create function to card
  if (CardFunction != null) {
    document.getElementById(IdText + "_Card").innerHTML +=
      "<script>" +
      window[CardFunction](
        FirsCardSlot,
        SecondCardSlot,
        ThirdCardSlot,
        FourthCardSlot,
        IdText + "_Card_icon"
      ) +
      "</script>";
  }
}
//Usage of CreateCard function first parameter is the card header, second parameter is the card content, third parameter is the card size, fourth parameter is the card icon
