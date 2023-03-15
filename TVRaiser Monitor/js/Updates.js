//Json fetch functions
//Weather
function weather() {
        //Updates the weather
        (async () => {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=60.81&longitude=23.62&current_weather=true&timezone=auto`);
                const json = await res.json();
                        document.getElementById("Latitude").innerHTML = "latitude: "+json.latitude;
                        document.getElementById("Longitude").innerHTML = "longitude: "+json.longitude;
                        document.getElementById("Temperature").innerHTML = json.current_weather.temperature+"°C";
              })();
        }
//Coffee
function Coffee() {
        //Updates the coffee status
        (async () => {
                const res = await fetch(`https://SERVER_NAME/tvr/`);
                const json = await res.json();
                        if (json.disable == 0) {
                        document.getElementById("CoffeeStatus").innerHTML = "Coffee status: "+json.title;
                        document.getElementById("CoffeeDescription").innerHTML = json.content;
                        }
                        else if (json.disable == 1) {
                        document.getElementById("CoffeeStatus").innerHTML = "Coffee disabled";
                        document.getElementById("CoffeeDescription").innerHTML = "Coffee is disabled";
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
      document.getElementById("TimeText").innerHTML = "Time: "+time;
      document.getElementById("DateText").innerHTML = "Date: "+date;
              }, 1000);

//5 minute updates
setInterval(function() {
        //Updates the weather every 5 minutes
        weather();
        //Updates the coffee status every 5 minutes
        Coffee();
              }, 300000);


//On load
weather();
Coffee();
