# TVRaiser — Repurpose Your Idle TV Screens

[![License: GNU](https://img.shields.io/badge/license-GNU-blue.svg)](#license)
[![Languages: JavaScript | Node.js](https://img.shields.io/badge/languages-JavaScript%20%7C%20Node.js-green.svg)](#tech-stack)
[![GitHub repo size](https://img.shields.io/github/repo-size/migit/TVRaiser)](#)


![TVRaiser Architecture](https://user-images.githubusercontent.com/6859479/223419738-9da8f093-8715-4cab-85c9-3b887046497f.png)


---

**TVRaiser** is a software platform that repurposes idle TV screens to display useful information from smart devices in your home or office. Check the status of your coffee machine, fridge contents, weather updates, notifications, and more, all from your TV.

---

## Features

* **Frontend**: Create and customize modular cards
* **Card Fields**: Automatic ID, header, content, size, icon, animation, functions
* **Functions**:

  * CoffeeStatus: machine status, description, level, temperature
  * WeatherStatus: weather info, temperature, longitude, latitude
  * TimeStatus: current time and date
  * UpdateNotifications: notifications with timestamps
  * CreateChart: charts with description, type, labels, and values

---

## Installation

### Prerequisites

* Node.js installed on your system

### Steps

1. Clone the repository:

```bash
git clone <repo-url>
cd TVRaiser
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

### Getting Started

1. Open the frontend: navigate to `http://localhost:3000`
2. Click **Create New Card**
3. Customize the card: add modular fields (ID, header, content, size, icon, animation, function)
4. Save and view on TV screen

---

## Troubleshooting

* **Issue**: TVRaiser fails to start

  * **Solution**: Ensure dependencies are installed, run `npm start` again
* **Issue**: Incorrect information on TV

  * **Solution**: Check card settings and device connections

---

## Roadmap

* Integration with more smart devices (thermostats, security systems)
* Support for custom functions and parameters
* Improved data visualization (charts, graphs)

---

## Contributing

* Submit bug reports and feature requests via GitHub issues
* Follow coding standards in `CONTRIBUTING.md`
* Submit code changes via pull requests with detailed descriptions

---

## API Improvements

We are constantly improving TVRaiser’s API. Feedback and suggestions are welcome.

---

## License

This project is licensed under the **GNU License**.

