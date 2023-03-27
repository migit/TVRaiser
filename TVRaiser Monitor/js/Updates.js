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
  FirsCardSlot = null,
  SecondCardSlot = null,
  ThirdCardSlot = null,
  FourthCardSlot = null,
  CardIconSlot = null
) {
  //Updates the weather
  (async () => {
    if (FirsCardSlot != null) {
      WeatherCardSlots.push(
        FirsCardSlot,
        SecondCardSlot,
        ThirdCardSlot,
        FourthCardSlot,
        CardIconSlot
      );
    }
    let First = 0;
    let Second = 1;
    let Third = 2;
    let Fourth = 3;
    let Fifth = 4;
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=60.81&longitude=23.62&current_weather=true&timezone=auto`
    );
    const json = await res.json();
    for (let i = 0; i < WeatherCardSlots.length; i + 5) {
      document.getElementById(WeatherCardSlots[First]).innerHTML =
        "Weathercode: <i>" + json.current_weather.weathercode + "</i>";
      document.getElementById(WeatherCardSlots[Second]).innerHTML =
        json.current_weather.temperature + "°C";
      document.getElementById(WeatherCardSlots[Third]).innerHTML =
        "longitude: <i>" + json.longitude + "</i>";
      document.getElementById(WeatherCardSlots[Fourth]).innerHTML =
        "latitude: <i>" + json.latitude + "</i>";
      document.getElementById(WeatherCardSlots[Second]).style.textAlign =
        "center";
      document.getElementById(WeatherCardSlots[Second]).style.fontSize = "60px";
      First = First + 5;
      Second = Second + 5;
      Third = Third + 5;
      Fourth = Fourth + 5;
      Fifth = Fifth + 5;
    }
    WeatherFTime = 1;
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
  FirsCardSlot = null,
  SecondCardSlot = null,
  ThirdCardSlot = null,
  FourthCardSlot = null,
  CardIconSlot = null
) {
  //Updates the coffee status
  (async () => {
    if (FirsCardSlot != null) {
      CoffeeCardSlots.push(FirsCardSlot, SecondCardSlot, CardIconSlot);
    }
    let First = 0;
    let Second = 1;
    let Fifth = 4;
    const res = await fetch(`https://bezainternational.org/tvr/`);
    const json = await res.json();
    JsonLength = json.length - 1;
    if (LastBrewed != json[JsonLength].id) {
      if (LastBrewed == null) {
        LastBrewed = json[JsonLength].id;
      }
      for (let i = 0; i < CoffeeCardSlots.length; i + 5) {
        LastBrewed = json[JsonLength].id;
        document.getElementById(CoffeeCardSlots[Second]).innerHTML =
          "Description: " + "<i>" + json[JsonLength].content + "</i>";
        CoffeeCardSlots[Fifth].classList.add("fa-shake");
        document.getElementById(CoffeeCardSlots[First]).innerHTML =
          "Status: " + "<i style = 'color: green'>Ready</i>";
        document.getElementById("Ding").play();
        TimerInterval = 20000;
        setTimeout(
          CoffeeSide,
          TimerInterval,
          CoffeeCardSlots[First],
          CoffeeCardSlots[Fifth]
        );

        First = First + 5;
        Second = Second + 5;
        Fifth = Fifth + 5;
      }
    }

    CoffeeFTime = 1;
  })();
}

//Time functions
function TimeStatus(
  FirsCardSlot = null,
  SecondCardSlot = null,
  ThirdCardSlot = null,
  FourthCardSlot = null,
  CardIconSlot = null
) {
  //Updates the time
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  for (let i = 0; i < TimeCardSlots.length; i + 5) {
    if (FirsCardSlot != null) {
      TimeCardSlots.push(FirsCardSlot, SecondCardSlot);
    }
    let First = 0;
    let Second = 1;
    document.getElementById(TimeCardSlots[First]).innerHTML =
      "Time: <i>" + time + "</i>";
    document.getElementById(TimeCardSlots[Second]).innerHTML =
      "Date: <i>" + date + "</i>";
    First = First + 5;
    Second = Second + 5;
  }
  TimeFTime = 1;
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
    TimeStatus();
  }
}

function updateWeather() {
  if (WeatherFTime == 1) {
    WeatherStatus();
  }
}

function updateCoffee() {
  if (CoffeeFTime == 1) {
    CoffeeStatus();
  }
}

setInterval(() => {
  updateTime();
  //updateCoffee();
  if (Date.now() % WEATHER_UPDATE_INTERVAL === 0) {
    updateWeather();
  }
}, TIME_UPDATE_INTERVAL);
