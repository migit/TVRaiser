TVRaiser
========

TVRaiser is a software platform that aims to repurpose idle TV screens by displaying useful information from other smart devices in your home or office. With TVRaiser, you can check the status of your coffee machine, view the contents of your fridge, and more, all from the comfort of your TV screen.

![demo](https://youtu.be/i0KT4ma06zw)

![TVRaiser simple architecthture - Azure (2019) framework](https://user-images.githubusercontent.com/6859479/223419738-9da8f093-8715-4cab-85c9-3b887046497f.png)

Features
--------

TVRaiser comes with a range of features that make it a versatile and user-friendly program. These features include:

Frontend
--------

TVRaiser's frontend allows you to easily create and customize cards, which display the information from your smart devices. The frontend includes:

- Card creation: You can create custom cards with modular fields, making it easy to add new entries as the program evolves.
- Settings: TVRaiser allows you to customize themes, page changes, and language settings.
- Card fields: When creating a card, you can add the following fields:
  - Automatic ID (recommended)
  - Card header (name of card, which also defines the IDs of card parts)
  - Card content (array of entries that each become their own line)
  - Card size (dropdown menu with options ranging from None to XXXLarge)
  - Card icon (dropdown menu with options ranging from None to CoffeeMug, Moon, and more)
  - Card animation (dropdown menu with options ranging from None to Shake, Spin, and more)
  - Card function (adds functions to the cards, requiring some parameters depending on the function)

Functions and Parameters
------------------------

TVRaiser comes with a range of functions and parameters that allow you to display a variety of useful information on your TV screen. These functions include:

- CoffeeStatus: Displays the status, description, level, and temperature of your coffee machine.
- WeatherStatus: Displays the weather status, current temperature, longitude, and latitude.
- TimeStatus: Displays the current time and date.
- UpdateNotifications: Displays notification updates and timestamps.
- CreateChart: Creates a chart with a slot, description, chart type, labels array, label, and values array.

Installation
------------------------

To install TVRaiser, follow these steps:

Clone the repository to your local machine.
1. Install the required dependencies by running npm install.
2. Start the application by running npm start.
3. Getting Started

To create a new card in TVRaiser, follow these steps:

1. Open the TVRaiser backend frontend by navigating to localhost:3000 in your browser.
2. Click the "Create New Card" button.
3. Customize the card settings by adding modular fields, including automatic ID, card header, card content, card size, card icon, card animation, and card function.
4. Save your new card and it will be displayed on your TV screen.

Troubleshooting
------------------------
If you encounter issues while using TVRaiser, try the following troubleshooting steps:

- Issue: TVRaiser fails to start.
  - Solution: Make sure that you have installed all the required dependencies and run npm start again.

- Issue: TVRaiser displays incorrect information on the TV screen.
  - Solution: Check your card settings to make sure that they are displaying the correct information from your smart devices.

Roadmap
------------------------
We are planning to add the following features to TVRaiser in the near future:

- Integration with additional smart devices, such as smart thermostats and security systems.
- Support for custom functions and parameters.
- Improved data visualization through charts and graphs.
Contributing
------------------------
We welcome contributions to TVRaiser from other developers. To contribute, please follow these guidelines:

- Submit bug reports and feature requests through the issue tracker.
- Follow the coding standards and best practices outlined in CONTRIBUTING.md.
- Submit code contributions through pull requests, with a clear description of the changes you have made.

Improvements to API
--------------------

TVRaiser is constantly evolving, and we are always looking for ways to improve its API. If you have any suggestions or feedback, we'd love to hear from you.

License
-------

This program is licensed under the GNU License.
