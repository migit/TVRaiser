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
  const PageContent = json[Page];
  let Iteration = 0;
  PageContent.forEach((element) => {
    //Creates the card
    console.log(element);
    CreateCard({
      CardHeader: element.CardHeader,
      CardContent: element.CardContent,
      CardSize: element.CardSize,
      CardIcon: element.CardIcon,
      CardAnimation: element.CardAnimation,
      CardFunction: element.CardFunction,
      FirstCardSlot: element.FirstCardSlot,
      SecondCardSlot: element.SecondCardSlot,
      ThirdCardSlot: element.ThirdCardSlot,
      FourthCardSlot: element.FourthCardSlot,
      FirstParameter: element.FirstParameter,
      SecondParameter: element.SecondParameter,
      ThirdParameter: element.ThirdParameter,
      FourthParameter: element.FourthParameter,
      FifthParameter: element.FifthParameter,
    });
    Iteration++;
  });
  return PageContent;
}

//Weather
async function WeatherStatus(CardData) {
  //Updates the weather
  try {
    const { FirstCardSlot, SecondCardSlot, ThirdCardSlot, FourthCardSlot } =
      CardData;
    const weatherCardSlots = [
      FirstCardSlot,
      SecondCardSlot,
      ThirdCardSlot,
      FourthCardSlot,
    ];

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=60.81&longitude=23.62&current_weather=true&timezone=auto`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await res.json();

    for (let i = 0; i < weatherCardSlots.length; i += 4) {
      const weatherCodeIndex = i;
      const temperatureIndex = i + 1;
      const longitudeIndex = i + 2;
      const latitudeIndex = i + 3;

      const weatherCodeElem = document.getElementById(
        weatherCardSlots[weatherCodeIndex]
      );
      const temperatureElem = document.getElementById(
        weatherCardSlots[temperatureIndex]
      );
      const longitudeElem = document.getElementById(
        weatherCardSlots[longitudeIndex]
      );
      const latitudeElem = document.getElementById(
        weatherCardSlots[latitudeIndex]
      );

      if (weatherCodeElem && temperatureElem && longitudeElem && latitudeElem) {
        weatherCodeElem.innerHTML = `Weathercode: <i>${json.current_weather.weathercode}</i>`;
        temperatureElem.innerHTML = `${json.current_weather.temperature}°C`;
        longitudeElem.innerHTML = `longitude: <i>${json.longitude}</i>`;
        latitudeElem.innerHTML = `latitude: <i>${json.latitude}</i>`;
        temperatureElem.style.textAlign = "center";
        temperatureElem.style.fontSize = "60px";
      }
    }
    WeatherFTime = 1;
  } catch (err) {
    console.error(err);
    // Add error handling code here if necessary
  }
}

//Coffee side function
function CoffeeSide(FirstCardSlot, CardIconSlot) {
  TimerInterval = 10;
  CardIconSlot.classList.remove("fa-shake");
  document.getElementById(FirstCardSlot).innerHTML =
    "Status: " + "<i style = 'color: Grey'>Idle</i>";
}

//Coffee main function
function CoffeeStatus(CardData) {
  //Updates the coffee status
  (async () => {
    try {
      if (CardData.FirstCardSlot != null) {
        CoffeeCardSlots.push(
          CardData.FirstCardSlot,
          CardData.SecondCardSlot,
          CardData.CardIconSlot
        );
      }
      let First = 0;
      let Second = 1;
      let Third = 2;
      const res = await fetch(`https://bezainternational.org/tvr/`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      JsonLength = json.length - 1;
      if (LastBrewed != json[JsonLength].id) {
        if (LastBrewed == null) {
          LastBrewed = json[JsonLength].id;
        }
        for (let i = 0; i <= CoffeeCardSlots.length; i = i + 4) {
          LastBrewed = json[JsonLength].id;
          if (document.getElementById(CoffeeCardSlots[First]) != null) {
            document.getElementById(CoffeeCardSlots[Second]).innerHTML =
              "Description: " + "<i>" + json[JsonLength].content + "</i>";
            CoffeeCardSlots[Third].classList.add("fa-shake");
            document.getElementById(CoffeeCardSlots[First]).innerHTML =
              "Status: " + "<i style = 'color: green'>Ready</i>";
            document.getElementById("Ding").play();
            TimerInterval = 20000;
            setTimeout(
              CoffeeSide,
              TimerInterval,
              CoffeeCardSlots[First],
              CoffeeCardSlots[Third]
            );
          }
          First = First + 3;
          Second = Second + 3;
          Third = Third + 3;
        }
      }
      CoffeeFTime = 1;
    } catch (error) {
      console.error(error);
    }
  })();
}

//Time functions
function TimeStatus(CardData) {
  //Updates the time
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  (async () => {
    if (CardData.FirstCardSlot != null) {
      TimeCardSlots.push(CardData.FirstCardSlot, CardData.SecondCardSlot);
    }
    let First = 0;
    let Second = 1;
    for (let i = 0; i <= TimeCardSlots.length; i = i + 3) {
      if (document.getElementById(TimeCardSlots[First]) != null) {
        document.getElementById(TimeCardSlots[First]).innerHTML =
          "Time: <i>" + time + "</i>";
        document.getElementById(TimeCardSlots[Second]).innerHTML =
          "Date: <i>" + date + "</i>";
      }
      First = First + 2;
      Second = Second + 2;
    }
    TimeFTime = 1;
  })();
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
    TimeStatus({ FirstCardSlot: null });
  }
}

function updateWeather() {
  if (WeatherFTime == 1) {
    WeatherStatus({ FirstCardSlot: null });
  }
}

function updateCoffee() {
  if (CoffeeFTime == 1) {
    CoffeeStatus({ FirstCardSlot: null });
  }
}

setInterval(() => {
  updateTime();
  updateCoffee();
  if (Date.now() % WEATHER_UPDATE_INTERVAL === 0) {
    updateWeather();
  }
}, TIME_UPDATE_INTERVAL);
