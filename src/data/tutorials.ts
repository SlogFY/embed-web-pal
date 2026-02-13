export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  content: string;
  code: string;
}

export const tutorials: Tutorial[] = [
  {
    id: "wifi-connect",
    title: "WiFi Station Mode",
    description: "Connect your ESP32 to a WiFi network and make HTTP requests.",
    category: "WiFi",
    difficulty: "Beginner",
    content: `## Connecting to WiFi\n\nThe ESP32 has built-in WiFi support. In station mode, it connects to an existing network just like your phone or laptop.\n\n### Steps\n1. Include the WiFi library\n2. Define your SSID and password\n3. Call \`WiFi.begin()\` and wait for connection\n4. Use the connection for HTTP requests, MQTT, etc.\n\n### Tips\n- Use \`WiFi.status()\` to check connection state\n- Implement reconnection logic for production use\n- Store credentials securely (not hardcoded)`,
    code: `#include <WiFi.h>\n\nconst char* ssid = "YourNetwork";\nconst char* password = "YourPassword";\n\nvoid setup() {\n  Serial.begin(115200);\n  WiFi.begin(ssid, password);\n\n  Serial.print("Connecting");\n  while (WiFi.status() != WL_CONNECTED) {\n    delay(500);\n    Serial.print(".");\n  }\n  Serial.println();\n  Serial.print("Connected! IP: ");\n  Serial.println(WiFi.localIP());\n}\n\nvoid loop() {\n  // Your code here\n}`,
  },
  {
    id: "blink-led",
    title: "Blink an LED",
    description: "The classic getting-started project – blink an LED with GPIO control.",
    category: "GPIO",
    difficulty: "Beginner",
    content: `## Blinking an LED\n\nThis is the \"Hello World\" of embedded programming.\n\n### Wiring\n- Connect LED anode (+) to GPIO 2 through a 220Ω resistor\n- Connect LED cathode (-) to GND\n\n### How It Works\n\`pinMode()\` sets the GPIO as output, then \`digitalWrite()\` toggles it high/low with a delay.`,
    code: `#define LED_PIN 2\n\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_PIN, LOW);\n  delay(1000);\n}`,
  },
  {
    id: "dht-sensor",
    title: "DHT Temperature Sensor",
    description: "Read temperature and humidity from a DHT11/DHT22 sensor.",
    category: "Sensors",
    difficulty: "Beginner",
    content: `## Reading DHT Sensors\n\nDHT11 and DHT22 are popular, affordable sensors for temperature and humidity.\n\n### Wiring (DHT22)\n- VCC → 3.3V\n- Data → GPIO 4 (with 10kΩ pull-up to 3.3V)\n- GND → GND\n\n### Library\nInstall the **DHT sensor library** by Adafruit via the Arduino Library Manager.`,
    code: `#include <DHT.h>\n\n#define DHTPIN 4\n#define DHTTYPE DHT22\n\nDHT dht(DHTPIN, DHTTYPE);\n\nvoid setup() {\n  Serial.begin(115200);\n  dht.begin();\n}\n\nvoid loop() {\n  float temp = dht.readTemperature();\n  float hum = dht.readHumidity();\n\n  if (isnan(temp) || isnan(hum)) {\n    Serial.println("Sensor read failed!");\n    return;\n  }\n\n  Serial.printf("Temp: %.1f°C  Humidity: %.1f%%\\n", temp, hum);\n  delay(2000);\n}`,
  },
  {
    id: "websocket-server",
    title: "WebSocket Server",
    description: "Create a WebSocket server on ESP32 for real-time browser communication.",
    category: "WiFi",
    difficulty: "Intermediate",
    content: `## ESP32 WebSocket Server\n\nWebSockets enable bidirectional real-time communication between ESP32 and web browsers.\n\n### Use Cases\n- Live sensor dashboards\n- Remote control interfaces\n- Real-time data streaming\n\n### Library\nUse the **WebSocketsServer** library from the Arduino Library Manager.`,
    code: `#include <WiFi.h>\n#include <WebSocketsServer.h>\n\nconst char* ssid = "YourNetwork";\nconst char* password = "YourPassword";\n\nWebSocketsServer ws(81);\n\nvoid onEvent(uint8_t num, WStype_t type, uint8_t* payload, size_t length) {\n  switch (type) {\n    case WStype_CONNECTED:\n      Serial.printf("Client %u connected\\n", num);\n      break;\n    case WStype_TEXT:\n      Serial.printf("Received: %s\\n", payload);\n      ws.sendTXT(num, "ACK");\n      break;\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  WiFi.begin(ssid, password);\n  while (WiFi.status() != WL_CONNECTED) delay(500);\n  \n  ws.begin();\n  ws.onEvent(onEvent);\n  Serial.println("WebSocket server started");\n}\n\nvoid loop() {\n  ws.loop();\n}`,
  },
  {
    id: "mqtt-publish",
    title: "MQTT Publish & Subscribe",
    description: "Connect to an MQTT broker and publish/subscribe to topics.",
    category: "WiFi",
    difficulty: "Intermediate",
    content: `## MQTT with ESP32\n\nMQTT is a lightweight messaging protocol ideal for IoT. ESP32 acts as both publisher and subscriber.\n\n### Setup\n1. Install **PubSubClient** library\n2. Connect to WiFi first\n3. Connect to your MQTT broker\n4. Publish sensor data and subscribe for commands`,
    code: `#include <WiFi.h>\n#include <PubSubClient.h>\n\nconst char* ssid = "YourNetwork";\nconst char* password = "YourPassword";\nconst char* mqtt_server = "broker.hivemq.com";\n\nWiFiClient espClient;\nPubSubClient client(espClient);\n\nvoid callback(char* topic, byte* payload, unsigned int length) {\n  Serial.printf("Message on [%s]: ", topic);\n  for (int i = 0; i < length; i++) Serial.print((char)payload[i]);\n  Serial.println();\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  WiFi.begin(ssid, password);\n  while (WiFi.status() != WL_CONNECTED) delay(500);\n\n  client.setServer(mqtt_server, 1883);\n  client.setCallback(callback);\n\n  while (!client.connected()) {\n    client.connect("ESP32Client");\n    delay(500);\n  }\n  client.subscribe("esp32/commands");\n}\n\nvoid loop() {\n  client.loop();\n  client.publish("esp32/temperature", "24.5");\n  delay(5000);\n}`,
  },
  {
    id: "ble-server",
    title: "BLE GATT Server",
    description: "Set up a Bluetooth Low Energy server with custom characteristics.",
    category: "Bluetooth",
    difficulty: "Advanced",
    content: `## BLE GATT Server\n\nCreate a BLE peripheral that exposes custom services and characteristics for mobile app communication.\n\n### Concepts\n- **Service**: A collection of related data (e.g., \"Environmental Sensing\")\n- **Characteristic**: A single data point within a service (e.g., temperature)\n- **Descriptor**: Metadata about a characteristic`,
    code: `#include <BLEDevice.h>\n#include <BLEServer.h>\n#include <BLEUtils.h>\n#include <BLE2902.h>\n\n#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"\n#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"\n\nBLECharacteristic *pCharacteristic;\n\nvoid setup() {\n  Serial.begin(115200);\n  BLEDevice::init("ESP32_BLE");\n\n  BLEServer *pServer = BLEDevice::createServer();\n  BLEService *pService = pServer->createService(SERVICE_UUID);\n\n  pCharacteristic = pService->createCharacteristic(\n    CHARACTERISTIC_UUID,\n    BLECharacteristic::PROPERTY_READ |\n    BLECharacteristic::PROPERTY_NOTIFY\n  );\n  pCharacteristic->addDescriptor(new BLE2902());\n  pCharacteristic->setValue("Hello BLE");\n\n  pService->start();\n  BLEAdvertising *pAdv = BLEDevice::getAdvertising();\n  pAdv->addServiceUUID(SERVICE_UUID);\n  pAdv->start();\n}\n\nvoid loop() {\n  pCharacteristic->setValue("Temp: 24.5°C");\n  pCharacteristic->notify();\n  delay(2000);\n}`,
  },
];

export const categories = ["All", "WiFi", "GPIO", "Sensors", "Bluetooth"];
