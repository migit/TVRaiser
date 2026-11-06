# TVRaiser: Raise Idle Screens from the Dead

TVRaiser turns idle TV screens into ambient dashboards for the smart devices in your home or office. Check your coffee machine's brewing status, the weather, the time, notifications and charts at a glance, on a screen that would otherwise sit dark.

An ESP32 (or any device that can send an HTTP request) posts sensor data to a PHP backend. You design modular "cards" in a web admin UI, and a dashboard page renders them full-screen on the TV.

> Project write-up: [TV Raiser on Hackster.io](https://www.hackster.io/mikroller/tv-raiser-raise-idle-screens-from-the-dead-c48793)

[![License: GNU](https://img.shields.io/badge/license-GNU-blue.svg)](#license) [![Languages: JavaScript | Node.js](https://img.shields.io/badge/languages-JavaScript%20%7C%20Node.js-green.svg)](#tech-stack) [![GitHub repo size](https://img.shields.io/github/repo-size/migit/TVRaiser)](#)


<!-- TODO: replace with a photo or short GIF of a real TV showing live cards. -->
<img width="1797" height="1329" alt="TVRaiser_ Repurposing Idle TV Screens for Smart Home Information - visual selection (1)" src="https://github.com/user-attachments/assets/e38bbdca-d64b-48e4-afdf-78f1f26b1ba2" />

---

## How it works

```
ESP32 / sensor  --HTTP POST-->  PHP backend (CodeIgniter)  <-->  Database
                                        ^
                                        |
              Admin frontend (create/edit cards)      Dashboard (shown on the TV)
```

| Folder | Role |
|---|---|
| `Admin-frontend/` | Web UI for creating and customizing cards |
| `Dashboard/` | Full-screen display page that runs on the TV |
| `Database/` | Database schema |
| `TVR4/` | <!-- TODO: one line describing TVR4 (backend/API?) --> |
| `postdata.ino` | Example ESP32 firmware that POSTs sensor values to the backend |

<!-- TODO: confirm the folder descriptions above match the code. -->

## Features

- Modular, customizable cards
- Each card has: automatic ID, header, content, size, icon, animation and function
- Built-in functions:
  - **CoffeeStatus**: machine status, description, level, temperature
  - **WeatherStatus**: weather info, temperature, longitude, latitude
  - **TimeStatus**: current time and date
  - **UpdateNotifications**: notifications with timestamps
  - **CreateChart**: charts with description, type, labels and values
- Tizen-compatible dashboard for Samsung smart TVs <!-- TODO: confirm Tizen status and tested models -->

## Requirements

<!-- TODO: confirm exact versions. The list below is what the project topics and files indicate. -->

- A web server with PHP (CodeIgniter-based backend) and a MySQL/MariaDB database
- Node.js and npm, if the frontend needs a build or dev server
- An ESP32 board and the Arduino IDE or PlatformIO, for the sensor side
- A TV or any screen with a browser

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/migit/TVRaiser.git
cd TVRaiser
```

### 2. Set up the database

1. Create an empty database and a dedicated user.
2. Import the schema from `Database/`.
3. Put the connection details in the backend configuration.

<!-- TODO: name the exact schema file and the config file/path. -->

### 3. Configure and start the backend

<!-- TODO: document the real steps: config file, base URL, how to serve the PHP app (Apache/Nginx/php -S). -->

### 4. Start the frontend

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

<!-- TODO: confirm that npm start serves the Admin frontend and not the whole stack. -->

## Getting started

1. Open the admin frontend.
2. Click **Create New Card**.
3. Fill in the fields: header, content, size, icon, animation and function.
4. Save, then open the dashboard URL in the TV's browser.

## Connecting a device

`postdata.ino` is a minimal example that POSTs a reading to the backend when a button is pressed.

1. Copy the sketch and create a `secrets.h` file (do not commit it) containing your Wi-Fi name, password and the backend URL.
2. Set `post_url` to your server's sensor endpoint, for example `http://<server>/sensor.php`.
3. Flash the ESP32 and press the button on pin 32 to send a test reading.

The example currently sends fixed values (`temp=160&level=100%`). Replace them with real sensor readings for your device.

<!-- TODO: document the exact payload fields the backend accepts and any authentication/API key once added. -->

## Security notes

- Never commit Wi-Fi credentials, API keys or database dumps containing real data.
- Use HTTPS and a per-device key for anything exposed beyond your local network.
- The example firmware uses plain HTTP and no authentication. It is meant for local testing only.

## Troubleshooting

| Problem | Fix |
|---|---|
| Frontend fails to start | Run `npm install` again and check your Node.js version |
| Cards show wrong or stale data | Check the card's function settings and that the device is posting to the right URL |
| ESP32 can't reach the server | Check Wi-Fi credentials, that the server is reachable from the ESP32's network, and the URL scheme (`http` vs `https`) |

## Roadmap

- Integration with more smart devices (thermostats, security systems)
- Custom functions and parameters
- Better data visualization (charts, graphs)
- MQTT support for device data
- Docker Compose setup for one-command installation

## Contributing

Bug reports and feature requests are welcome through [GitHub issues](https://github.com/migit/TVRaiser/issues). Please read [CONTRIBUTING.md](CONTRIBUTING.md) first, and submit changes as pull requests with a clear description.

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

TVRaiser is licensed under the **GNU General Public License v3.0**. See [License.md](License.md) for details.
