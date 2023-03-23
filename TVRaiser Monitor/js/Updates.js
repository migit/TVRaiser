//Variables
var LastBrewed = 0;
var JsonLength = 0;
var TimerInterval = 200;
var CurrentPage = "MainPage";

var CoffeeFTime = 0;
var TimeFTime = 0;
var WeatherFTime = 0;

var TimeCardSlots = [];
var CoffeeCardSlots = [];
var WeatherCardSlots = [];
//Json fetch functions
async function CardCreation(Page) {
  CurrentPage = Page;
  document.getElementById("CardHolder").innerHTML = "";
  //Fetches the json file
  const res = await fetch(`test.json`);
  const json = await res.json();
  console.log(json);
  const PageContent = json[Page];
  let Iteration = 0;
  PageContent.forEach((element) => {
    CreateCard(
      element.CardHeader,
      element.CardContent,
      element.CardSize,
      element.CardIcon,
      element.CardAnimation,
      element.CardFunction,
      element.FirstCardSlot,
      element.SecondCardSlot,
      element.ThirdCardSlot,
      element.FourthCardSlot
    );
    Iteration++;
  });
  return PageContent;
}

//Weather
function WeatherStatus(
  FirsCardSlot,
  SecondCardSlot,
  ThirdCardSlot,
  FourthCardSlot,
  CardIconSlot
) {
  //Updates the weather
  (async () => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=60.81&longitude=23.62&current_weather=true&timezone=auto`
    );
    const json = await res.json();
    document.getElementById(FirsCardSlot).innerHTML =
      "Weathercode: <i>" + json.current_weather.weathercode + "</i>";
    document.getElementById(SecondCardSlot).innerHTML =
      json.current_weather.temperature + "°C";
    document.getElementById(ThirdCardSlot).innerHTML =
      "longitude: <i>" + json.longitude + "</i>";
    document.getElementById(FourthCardSlot).innerHTML =
      "latitude: <i>" + json.latitude + "</i>";
    document.getElementById(SecondCardSlot).style.textAlign = "center";
    document.getElementById(SecondCardSlot).style.fontSize = "60px";
    if (WeatherFTime == 0) {
      WeatherFTime = 1;
      WeatherCardSlots = [
        FirsCardSlot,
        SecondCardSlot,
        ThirdCardSlot,
        FourthCardSlot,
        CardIconSlot,
      ];
    }
  })();
}
//Coffee side function
function CoffeeSide(FirsCardSlot, CardIconSlot) {
  TimerInterval = 10;
  CardIconSlot.classList.remove("fa-shake");
  document.getElementById(FirsCardSlot).innerHTML =
    "Status: " + "<i style = 'color: Grey'>Idle</i>";
}

//Coffee main function
function CoffeeStatus(
  FirsCardSlot,
  SecondCardSlot,
  ThirdCardSlot,
  FourthCardSlot,
  CardIconSlot
) {
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
      document.getElementById(SecondCardSlot).innerHTML =
        "<i>" + json[JsonLength].content + "</i>";
      CardIconSlot.classList.add("fa-shake");
      document.getElementById(FirsCardSlot).innerHTML =
        "Status: " + "<i style = 'color: green'>Ready</i>";
      document.getElementById("Ding").play();
      TimerInterval = 20000;
      setTimeout(CoffeeSide, 20000, FirsCardSlot, CardIconSlot);
      if (CoffeeFTime == 0) {
        CoffeeFTime = 1;
        CoffeeCardSlots = [
          FirsCardSlot,
          SecondCardSlot,
          ThirdCardSlot,
          FourthCardSlot,
          CardIconSlot,
        ];
      }
    }
  })();
}

//Time functions
function TimeStatus(
  FirsCardSlot,
  SecondCardSlot,
  ThirdCardSlot,
  FourthCardSlot,
  CardIconSlot
) {
  //Updates the time
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById(FirsCardSlot).innerHTML = "Time: <i>" + time + "</i>";
  document.getElementById(SecondCardSlot).innerHTML =
    "Date: <i>" + date + "</i>";
  if (TimeFTime == 0) {
    TimeFTime = 1;
    TimeCardSlots = [
      FirsCardSlot,
      SecondCardSlot,
      ThirdCardSlot,
      FourthCardSlot,
      CardIconSlot,
    ];
  }
}

//Update functions

//Class watcher to watch for json changes
class JsonWatcher {
  constructor(jsonObj, keyToWatch, callback, pollInterval = 1000) {
    this.jsonObj = jsonObj;
    this.keyToWatch = keyToWatch;
    this.callback = callback;
    this.pollInterval = pollInterval;
    this.currentValue = jsonObj[keyToWatch];
    this.timerId = null;
  }
  //Starts the watcher
  start() {
    if (this.timerId) {
      console.warn("The watcher is already running");
      return;
    }
    this.timerId = setInterval(() => {
      if (this.jsonObj[this.keyToWatch] !== this.currentValue) {
        this.currentValue = this.jsonObj[this.keyToWatch];
        this.callback(this.currentValue);
      }
    }, this.pollInterval);
  }
  //Stops the watcher
  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}
/*
const watcher = new JsonWatcher(jsonObj, "page", onPageChange, 500);
watcher.start();
*/
const TIME_UPDATE_INTERVAL = 1000; // 1 second
const WEATHER_UPDATE_INTERVAL = 120000; // 2 minutes
const COFFEE_UPDATE_INTERVAL = 120000; // 2 minutes

function updateTime() {
  if (TimeFTime == 1) {
    TimeStatus(
      TimeCardSlots[0],
      TimeCardSlots[1],
      TimeCardSlots[2],
      TimeCardSlots[3],
      TimeCardSlots[4]
    );
  }
}

function updateWeather() {
  if (WeatherFTime == 1) {
    WeatherStatus(
      WeatherCardSlots[0],
      WeatherCardSlots[1],
      WeatherCardSlots[2],
      WeatherCardSlots[3],
      WeatherCardSlots[4]
    );
  }
}

function updateCoffee() {
  if (CoffeeFTime == 1) {
    CoffeeStatus(
      CoffeeCardSlots[0],
      CoffeeCardSlots[1],
      CoffeeCardSlots[2],
      CoffeeCardSlots[3],
      CoffeeCardSlots[4]
    );
  }
}

setInterval(() => {
  updateTime();
  updateCoffee();
  if (Date.now() % WEATHER_UPDATE_INTERVAL === 0) {
    updateWeather();
  }
}, TIME_UPDATE_INTERVAL);
