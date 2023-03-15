//Variables
var LastBrewed = 0;
var JsonLength = 0;
var TimerInterval = 200;
//Json fetch functions
//Weather
function weather() {
        //Updates the weather
        (async () => {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=60.81&longitude=23.62&current_weather=true&timezone=auto`);
                const json = await res.json();
                        document.getElementById("Weather_Card_content_0").innerHTML = "Weathercode: "+json.current_weather.weathercode;
                        document.getElementById("Weather_Card_content_1").innerHTML = json.current_weather.temperature+"°C";
                        document.getElementById("Weather_Card_content_2").innerHTML = "longitude: "+json.longitude;
                        document.getElementById("Weather_Card_content_3").innerHTML = "latitude: "+json.latitude;
                        document.getElementById("Weather_Card_content_1").style.textAlign = "center";
                        document.getElementById("Weather_Card_content_1").style.fontSize = "60px";
              })();
        }
//Coffee side function
function CoffeeSide() {
        TimerInterval = 10;
        document.getElementById("CoffeeIcon").classList.remove("fa-shake");
        document.getElementById("CoffeeStatus").style.color = "Red";
        document.getElementById("CoffeeStatus").innerHTML = "Idle";
        //document.getElementById("coffeeDescription").innerHTML = "Coffee is not being brewed";
}

//Coffee main function
function Coffee() {
        //Updates the coffee status
        (async () => {
                const res = await fetch(`https://bezainternational.org/tvr/`);
                const json = await res.json();
                        JsonLength = json.length - 1;
                        if (LastBrewed != json[JsonLength].id) {
                                LastBrewed = json[JsonLength].id;
                                document.getElementById("CoffeeIcon").classList.add("fa-shake");
                                document.getElementById("CoffeeStatus").style.color = "Green";
                                document.getElementById("CoffeeStatus").innerHTML = "Ready";
                                document.getElementById("Coffee").play();
                                //document.getElementById("coffeeDescription").innerHTML = json[0].content;
                                TimerInterval = 20000;
                                setTimeout(CoffeeSide, 20000);
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
      document.getElementById("Time_Card_content_0").innerHTML = "Time: "+time;
      document.getElementById("Time_Card_content_1").innerHTML = "Date: "+date;
              }, 100);

//5 minute updates
setInterval(function() {
        //Updates the weather every 5 minutes
        weather();
        //Updates the coffee status every 5 minutes
        Coffee();
              }, TimerInterval); //300000 = 5 minutes


//On load
weather();
Coffee();
