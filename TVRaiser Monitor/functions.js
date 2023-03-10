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
      }).catch(err => console.error(err));
