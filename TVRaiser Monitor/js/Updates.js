//Variables
var Iteration = 0;
var LastBrewed = 0;
var JsonLength = 0;
var TimerInterval = 200;
//Json fetch functions
function CardCreation() {
        (async () => {
                const res = await fetch(`test.json`);
                const json = await res.json();
                json.forEach(element => {
                        console.log(json);
                        CreateCard(json[Iteration].CardHeader, json[Iteration].CardContent, json[Iteration].CardSize, json[Iteration].CardIcon, json[Iteration].CardAnimation);
                        Iteration++;
                });           
        })();
        Iteration = 0;
}
//Weather
function weather() {
        //Updates the weather
        (async () => {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=60.81&longitude=23.62&current_weather=true&timezone=auto`);
                const json = await res.json();
                        document.getElementById("Weather_Card_content_0").innerHTML = "Weathercode: <i>"+json.current_weather.weathercode+"</i>";
                        document.getElementById("Weather_Card_content_1").innerHTML = json.current_weather.temperature+"°C";
                        document.getElementById("Weather_Card_content_2").innerHTML = "longitude: <i>"+json.longitude+"</i>";
                        document.getElementById("Weather_Card_content_3").innerHTML = "latitude: <i>"+json.latitude+"</i>";
                        document.getElementById("Weather_Card_content_1").style.textAlign = "center";
                        document.getElementById("Weather_Card_content_1").style.fontSize = "60px";
              })();
        }
//Coffee side function
function CoffeeSide(FirsCardSlot, CardIconSlot) {
        TimerInterval = 10;
        document.getElementById(CardIconSlot).classList.remove("fa-shake");
        document.getElementById(FirsCardSlot).innerHTML = "Status: "+"<i style = 'color: Grey'>Idle</i>";
        //document.getElementById("coffeeDescription").innerHTML = "Coffee is not being brewed";
}

//Coffee main function
function Coffee(FirsCardSlot, SecondCardSlot, CardIconSlot) {
        //Updates the coffee status
        (async () => {
                const res = await fetch(`https://bezainternational.org/tvr/`);
                const json = await res.json();
                        JsonLength = json.length - 1;
                        if (LastBrewed != json[JsonLength].id) {
                                if (LastBrewed == null) {
                                        LastBrewed = json[JsonLength].id;
                                }
                                LastBrewed = json[JsonLength].id;
                                document.getElementById(SecondCardSlot).innerHTML += "<i>"+json[JsonLength].content+"</i>";
                                document.getElementById(CardIconSlot).classList.add("fa-shake");
                                document.getElementById(FirsCardSlot).innerHTML = "Status: "+"<i style = 'color: green'>Ready</i>";
                                document.getElementById("Coffee").play();
                                //document.getElementById("coffeeDescription").innerHTML = json[0].content;
                                TimerInterval = 20000;
                                setTimeout(CoffeeSide(), 20000);
                }
              })();
        }

//Update functions

//Updates every second
setInterval(function() {
      
      //Date functions
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      //Time functions
      document.getElementById("Time_Card_content_0").innerHTML = "Time: <i>"+time+"</i>";
      document.getElementById("Time_Card_content_1").innerHTML = "Date: <i>"+date+"</i>";
              }, 100);

//2 minute updates
setInterval(function() {
        //Updates the weather every 2 minutes
        weather();
        //Updates the coffee status every 2 minutes
        Coffee();
              }, TimerInterval); //300000 = 5 minutes


//On load
CardCreation();
weather();
Coffee();
