#include "esp_http_client.h"
#include <WiFi.h>

const char *ssid = "wifi_SSID";
const char *password = "WIFI_password";

const char *post_url = "http://SERVER_NAME/sensor.php";
const char *post_data = "temp=160&level=100%";

bool internet_connected = false;
const int buttonPin = 32;
const int ledPin = 14;
int buttonState = 0;

void setup()
{
  Serial.begin(115200);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);

  if (init_wifi())
  {
    internet_connected = true;
    Serial.println("Internet connected");
  }
}

bool init_wifi()
{
  int connAttempts = 0;
  Serial.println("\r\nConnecting to: " + String(ssid));
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
    if (connAttempts > 10)
      return false;
    connAttempts++;
  }
  return true;
}

esp_err_t _http_event_handler(esp_http_client_event_t *evt)
{
  switch (evt->event_id)
  {
  case HTTP_EVENT_ERROR:
    Serial.println("HTTP_EVENT_ERROR");
    break;
  case HTTP_EVENT_ON_CONNECTED:
    Serial.println("HTTP_EVENT_ON_CONNECTED");
    break;
  case HTTP_EVENT_HEADER_SENT:
    Serial.println("HTTP_EVENT_HEADER_SENT");
    break;
  case HTTP_EVENT_ON_HEADER:
    Serial.println();
    Serial.printf("HTTP_EVENT_ON_HEADER, key=%s, value=%s", evt->header_key, evt->header_value);
    break;
  case HTTP_EVENT_ON_DATA:
    Serial.println();
    Serial.printf("HTTP_EVENT_ON_DATA, len=%d", evt->data_len);
    if (!esp_http_client_is_chunked_response(evt->client))
    {

      // printf("%.*s", evt->data_len, (char*)evt->data);
    }
    break;
  case HTTP_EVENT_ON_FINISH:
    Serial.println("");
    Serial.println("HTTP_EVENT_ON_FINISH");
    break;
  case HTTP_EVENT_DISCONNECTED:
    Serial.println("HTTP_EVENT_DISCONNECTED");
    break;
  }
  return ESP_OK;
}

static esp_err_t post_something()
{
  esp_err_t res = ESP_OK;

  esp_http_client_handle_t http_client;

  esp_http_client_config_t config_client = {0};
  config_client.url = post_url;
  config_client.event_handler = _http_event_handler;
  config_client.method = HTTP_METHOD_POST;

  http_client = esp_http_client_init(&config_client);

  esp_http_client_set_post_field(http_client, post_data, strlen(post_data));

  // esp_http_client_set_header(http_client, "Content-Type", "image/jpg"); // sending a jpg file we will do this in the future

  esp_err_t err = esp_http_client_perform(http_client);
  if (err == ESP_OK)
  {
    Serial.print("esp_http_client_get_status_code: ");
    Serial.println(esp_http_client_get_status_code(http_client));
  }

  esp_http_client_cleanup(http_client);
}

void loop()
{

  buttonState = digitalRead(buttonPin);
  if (buttonState == LOW)
  {
    // Switch onboard the led
    digitalWrite(ledPin, HIGH);
    post_something();
  }
  else
  {
    // Switch off the onboard led
    digitalWrite(ledPin, LOW);
  }
}

// Example of a POST request using the ArduinoHttpClient library
/*
#include <WiFi.h>
#include <HTTPClient.h>

const char *ssid = "your_SSID";
const char *password = "your_PASSWORD";
const char *serverName = "https://yourserver.com/post_data.php";

void setup()
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

  // Configure the SSL/TLS certificate
  WiFiClientSecure client;
  client.setCACert(root_ca);

  HTTPClient https;
  https.begin(client, serverName);
  https.addHeader("Content-Type", "application/x-www-form-urlencoded");

  // Prepare the data to be posted
  String data = "sensorValue=12345&sensorType=temperature";

  // Send the POST request
  int httpCode = https.POST(data);
  if (httpCode > 0)
  {
    String response = https.getString();
    Serial.println(httpCode);
    Serial.println(response);
  }
  else
  {
    Serial.println("Error on HTTP request");
  }

  https.end();
}

void loop()
{
  // Do nothing
}
*/