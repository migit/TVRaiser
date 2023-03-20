//variables
var i = 0;

//Function to create cards
function CreateCard(CardHeader, CardContent = [], CardSize, CardIcon, CardAnimation) {
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
    switch(CardSize) {
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
    switch(CardIcon) {
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
    switch(CardAnimation) {
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
    document.getElementById('CardHolder').innerHTML += '<div id="'+IdText+"_Card"+'" class="w3-card-4 w3-round-large w3-margin '+CardSize+' "> <header id="'+IdText+"_Card_header"+'" class="w3-container w3-theme w3-round-large"> <h1 id="'+IdText+"_Card_title"+'">'+CardHeader+'</h1> <p style = "margin-left: 80px;" id="'+IdText+"_Card_icon"+'" class="'+CardIcon+" "+CardAnimation+' w3-margin w3-jumbo"></p> </header> <div id="'+IdText+"_Card_container"+'" class="w3-container"> </div> </div> </div>';
    //Used to create card content
    CardContent.forEach(element => {
        document.getElementById(IdText+'_Card_container').innerHTML += "<p id="+IdText+"_Card_content_"+i+">"+CardContent[i]+"</p>";
        i++;
    });
    i = 0;
}

//Usage of CreateCard function first parameter is the card header, second parameter is the card content, third parameter is the card size, fourth parameter is the card icon