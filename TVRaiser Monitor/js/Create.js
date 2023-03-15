function CreateCard(CardHeader, CardContent, CardSize, CardIcon) {
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
            CardIcon = "fa fa-clock-o";
            break;
        case "Sun":
            CardIcon = "fa fa-sun-o";
            break;
        case "CoffeeMug":
            CardIcon = "fa fa-coffee";
            break;
        case "Calendar":
            CardIcon = "fa fa-calendar";
            break;
    }
    //Used to create card div
    document.write('<div id="'+CardHeader+"_Card"+'" class="w3-card-4 w3-round-large w3-margin '+CardSize+' "> <header class="w3-container w3-theme w3-round-large"> <h1>'+CardHeader+'</h1> <i class="'+CardIcon+' w3-jumbo"></i> </header> <div class="w3-container"> <p>'+CardContent+'</p> </div> </div> </div>');
}

document.getElementById("CardHolder").onload='CreateCard("Test", "Test", "Small", "Bell")'