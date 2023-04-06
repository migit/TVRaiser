//Variables
var LastBrewed = 0;
var LastNotification = 0;
var JsonLength = 0;
var TimerInterval = 200;
var CurrentPage = "MainPage";

var CoffeeFTime = 0;
var TimeFTime = 0;
var WeatherFTime = 0;

var TimeCardSlots = [];
var CoffeeCardSlots = [];
var WeatherCardSlots = [];
var NotificationCardSlots = [];

const TIME_UPDATE_INTERVAL = 1000; // 1 second
const WEATHER_UPDATE_INTERVAL = 120000; // 2 minutes
const COFFEE_UPDATE_INTERVAL = 120000; // 2 minutes

//Modular functions
//Checks if the json data is new
function isDataNew(jsonData, Check) {
  const latestId = jsonData[jsonData.length - 1].id;
  return latestId !== Check;
}
//Clears card holder
function ClearCardHolder() {
  JsonLength = 0;
  TimerInterval = 200;
  CoffeeFTime = 0;
  TimeFTime = 0;
  WeatherFTime = 0;
  TimeCardSlots = [];
  CoffeeCardSlots = [];
  WeatherCardSlots = [];
  NotificationCardSlots = [];
  const cardHolder = document.getElementById("CardHolder");
  while (cardHolder.firstChild) {
    cardHolder.removeChild(cardHolder.firstChild);
  }
}

//Json fetch functions
async function CardCreation(Page) {
  CurrentPage = Page;
  ClearCardHolder();

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
      throw new Error(`HTTP error! status: ${res.status}`);
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
  COFFEE_UPDATE_INTERVAL = 1000;
}

async function CoffeeStatus(CardData) {
  // Updates the coffee status
  try {
    if (CardData.FirstCardSlot != null) {
      CoffeeCardSlots.push(
        CardData.FirstCardSlot,
        CardData.SecondCardSlot,
        CardData.CardIconSlot
      );
    }
    const res = await fetch(`https://bezainternational.org/tvr/`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();
    if (isDataNew(json, LastBrewed)) {
      LastBrewed = json[json.length - 1].id;
      for (let i = 0; i <= CoffeeCardSlots.length; i = i + 4) {
        if (document.getElementById(CoffeeCardSlots[i]) != null) {
          document.getElementById(CoffeeCardSlots[i + 1]).innerHTML =
            "Description: " + "<i>" + json[json.length - 1].content + "</i>";
          CoffeeCardSlots[i + 2].classList.add("fa-shake");
          document.getElementById(CoffeeCardSlots[i]).innerHTML =
            "Status: " + "<i style = 'color: green'>Ready</i>";
          document.getElementById("Ding").play();
          TimerInterval = 20000;
          setTimeout(
            CoffeeSide,
            TimerInterval,
            CoffeeCardSlots[i],
            CoffeeCardSlots[i + 2]
          );
        }
      }
    } else if (!isDataNew(json, LastBrewed)) {
      for (let i = 0; i <= CoffeeCardSlots.length; i = i + 4) {
        if (document.getElementById(CoffeeCardSlots[i]) != null) {
          document.getElementById(CoffeeCardSlots[i + 1]).innerHTML =
            "Description: " + "<i>" + json[json.length - 1].content + "</i>";
          document.getElementById(CoffeeCardSlots[i]).innerHTML =
            "Status: " + "<i>idle</i>";
        }
      }
    }
    CoffeeFTime = 1;
  } catch (error) {
    console.error(error);
  }
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
// Notification functions
async function updateNotifications(CardData) {
  const res = await fetch("TestNotifications.json");
  if (!res.ok) {
    console.error(`HTTP error! status: ${res.status}`);
    return;
  }
  const json = await res.json();
  if (isDataNew(json)) {
    LastNotification = json[json.length - 1].id;
    if (CardData.FirstCardSlot != null) {
      NotificationCardSlots.push(CardData.FirstCardSlot);
      NotificationCardSlots.push(CardData.SecondCardSlot);
    }

    for (let i = 0; i < NotificationCardSlots.length; i = i + 2) {
      const NotificationSlot = i;
      const timestampSlot = i + 1;
      const card = document.getElementById(
        NotificationCardSlots[NotificationSlot]
      );
      const card2 = document.getElementById(
        NotificationCardSlots[timestampSlot]
      );
      if (card != null) {
        card.innerHTML =
          "Notification: <i>" + json[json.length - 1].message + "</i>";
        card2.innerHTML =
          "Time: <i>" + json[json.length - 1].timestamp + "</i>";
      }
    }
    NotificationFTime = 1;
  }
}
//Calender events
async function FetchCalendarEvents(CardData) {
  try {
    const response = await fetch(CardData.endpointUrl, {
      headers: {
        Authorization: `Bearer ${CardData.authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    if (isDataNew(data)) {
      LastCalendarEvent = data[data.length - 1].id;
      if (CardData.FirstCardSlot != null) {
        CalendarCardSlots.push(CardData.FirstCardSlot);
        CalendarCardSlots.push(CardData.SecondCardSlot);
      }
      for (let i = 0; i < CalendarCardSlots.length; i = i + 2) {
        const CalendarSlot = i;
        const card = document.getElementById(CalendarCardSlots[CalendarSlot]);
      }
    }
    console.log(data);
  } catch (error) {
    // Handle any errors here
    console.error(error);
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
  if (Date.now() % COFFEE_UPDATE_INTERVAL === 0) {
    updateCoffee();
  }

  if (Date.now() % WEATHER_UPDATE_INTERVAL === 0) {
    updateWeather();
  }
}, TIME_UPDATE_INTERVAL);
