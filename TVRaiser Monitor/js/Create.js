//variables
var i = 0;

let CreatedCards = [];

//Function to create main elements
function CreateMain(Page) {
  //Create main elements

  FirstSideBarClick = "MainPage";
  SecondSideBarClick = "Charts";
  ThirdSideBarClick = "Panorama";
  FourthSideBarClick = "Tickets";
  FifthSideBarClick = "Recreation";

  document.getElementById("main").innerHTML +=
    ' <!-- SideBar --> <div class="w3-sidebar w3-bar-block w3-border-right w3-black w3-animate-left w3-top" style="display: none; z-index: 5" id="Sidebar" > <button onclick="SideB_Close()" id="SideBarClose" class="w3-bar-item w3-theme" > Close &times; </button> <button onclick=CardCreation("' +
    FirstSideBarClick +
    '") class="w3-bar-item w3-button">Main Page</button> <button onclick=CardCreation("' +
    SecondSideBarClick +
    '") class="w3-bar-item w3-button">Charts</button> <button onclick=CardCreation("' +
    ThirdSideBarClick +
    '") class="w3-bar-item w3-button">Panorama</button> <button onclick=CardCreation("' +
    FourthSideBarClick +
    '") class="w3-bar-item w3-button">Tickets</button> <button onclick=CardCreation("' +
    FifthSideBarClick +
    '") class="w3-bar-item w3-button">Recreation</button> </div> <div id="Banner" class="w3-theme w3-top w3-margin-bottom"> <!-- "Hamburger" button --> <div class="w3-row"> <button id="MainSideBarButton" class="w3-button w3-theme w3-xxlarge w3-left-align" style="width: 70px" onclick="SideB_Open()" > ☰ </button> <div class="w3-center w3-rest"><h1>TVRaiser Monitor</h1></div> </div> </div> <div class="w3-overlay" onclick="SideB_Close()" style="cursor: pointer" id="myOverlay" ></div> <p></p> <!-- Main page --> <div id="CardHolder" class="w3-container"></div> <!-- Footer --> <div class="w3-container w3-theme-d5 w3-center w3-bottom"> <h5 style="margin-left: 130px; display: inline-block"> Property of TVRaiser some rights reserved </h5> <img src="images/qrcode.png" alt="QRcode" style=" width: 100px; height: 100px; float: right; margin-bottom: 10px; margin-top: 10px; " /> </div>';
}
//Function to create cards
function CreateCard(
  CardHeader = "Card Header",
  CardContent = ["Card Content"],
  CardSize = "w3-half",
  CardIcon = "",
  CardAnimation = "",
  CardFunction = null,
  FirsCardSlot = null,
  SecondCardSlot = null,
  ThirdCardSlot = null,
  FourthCardSlot = null
) {
  //Variables
  var Differentiator = 0;

  var CardProcessing = CardHeader;

  //Convert CardSize variables to right format
  const cardSizeMap = {
    None: "w3-hide",
    Small: "w3-quarter",
    Medium: "w3-third",
    Large: "w3-half",
    XLarge: "w3-twothird",
    XXLarge: "w3-threequarter",
    XXXLarge: "w3-full",
  };

  CardSize = cardSizeMap[CardSize] || "";

  //Convert CardIcon variables to right format
  const cardIconMap = {
    None: "",
    Info: "fa fa-info-circle",
    Warning: "fa fa-exclamation-triangle",
    Bell: "fa fa-bell",
    Question: "fa fa-question-circle",
    Clock: "fa fa-clock",
    Sun: "fa fa-sun",
    Moon: "fa fa-moon",
    Cloud: "fa fa-cloud",
    CoffeeMug: "fa fa-coffee",
    Calender: "fa fa-calendar",
  };

  CardIcon = cardIconMap[CardIcon] || "";

  //Convert CardAnimation variables to right format
  const cardAnimationMap = {
    None: "",
    Pulse: "fa-pulse",
    Fade: "fa-fade",
    Beat: "fa-beat",
    Bounce: "fa-bounce",
    Spin: "fa-spin",
    Shake: "fa-shake",
  };

  CardAnimation = cardAnimationMap[CardAnimation] || "";
  //Used to create card divs
  while (CreatedCards.includes(CardProcessing)) {
    CardProcessing = CardHeader + "_" + Differentiator;
    Differentiator++;
  }

  Differentiator = 0;
  CreatedCards.push(CardProcessing);
  let IdText = CardProcessing.replace(/ /g, "_");
  const cardHtml = `
  <div id="${IdText}_Card" class="w3-card-4 w3-round-large w3-margin ${CardSize}">
    <header id="${IdText}_Card_header" class="w3-container w3-theme w3-round-large">
      <h1 id="${IdText}_Card_title">${CardHeader}</h1>
      <p style="margin-left: 80px;" id="${IdText}_Card_icon" class="${CardIcon} ${CardAnimation} w3-margin w3-jumbo"></p>
    </header>
    <div id="${IdText}_Card_container" class="w3-container"></div>
  </div>
`;

  document
    .getElementById("CardHolder")
    .insertAdjacentHTML("beforeend", cardHtml);

  //Used to create card content
  for (let i = 0; i < CardContent.length; i++) {
    document.getElementById(IdText + "_Card_container").innerHTML +=
      "<p id=" + IdText + "_Card_content_" + i + ">" + CardContent[i] + "</p>";
  }
  //Used to create card slots
  FirsCardSlot = IdText + "_Card_content_" + FirsCardSlot;
  SecondCardSlot = IdText + "_Card_content_" + SecondCardSlot;
  ThirdCardSlot = IdText + "_Card_content_" + ThirdCardSlot;
  FourthCardSlot = IdText + "_Card_content_" + FourthCardSlot;
  //used to create function to card
  if (CardFunction) {
    const cardElement = document.getElementById(`${IdText}_Card`);
    const iconElement = document.getElementById(`${IdText}_Card_icon`);
    const script = window[CardFunction](
      FirsCardSlot,
      SecondCardSlot,
      ThirdCardSlot,
      FourthCardSlot,
      iconElement
    );
    if (script) {
      const scriptElement = document.createElement("script");
      scriptElement.textContent = script;
      cardElement.appendChild(scriptElement);
    }
  }
}
//Usage of CreateCard function first parameter is the card header, second parameter is the card content, third parameter is the card size, fourth parameter is the card icon
