//Closing functions
function SideB_Open() {
    document.getElementById("Sidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
  
  function SideB_Close() {
    document.getElementById("Sidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

  //Json functions
  /*fetch('https://bezainternational.org/tvr/public/')
          .then(res => res.json())
          .then((out) => {
              console.log('Output: ', out);
      }).catch(err => console.error(err));*/

  fetch('https://api.open-meteo.com/v1/forecast?latitude=60.81&longitude=23.62&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin')
          .then(res => res.json())
          .then((out) => {
              console.log('Output: ', out);
              document.getElementById("Latitude").innerHTML = "latitude: "+out.latitude;
              document.getElementById("Longitude").innerHTML = "longitude: "+out.longitude;
              document.getElementById("Temperature").innerHTML = out.hourly.temperature_2m[0]+"°C";
      }).catch(err => console.error(err));

      

    //Date functions
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //Time functions
    document.getElementById("TimeText").innerHTML = "Time: "+time;
    document.getElementById("DateText").innerHTML = "Date: "+date;