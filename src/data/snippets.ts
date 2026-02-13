export interface Snippet {
  id: string;
  title: string;
  description: string;
  category: string;
  code: string;
}

export const snippets: Snippet[] = [
  {
    id: "deep-sleep",
    title: "Deep Sleep Timer",
    description: "Put ESP32 to sleep and wake after a set interval to save power.",
    category: "Power",
    code: `#define uS_TO_S_FACTOR 1000000ULL\n#define TIME_TO_SLEEP  30  // seconds\n\nvoid setup() {\n  Serial.begin(115200);\n  Serial.println("Awake! Doing work...");\n\n  // Do your work here (read sensor, send data, etc.)\n\n  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);\n  Serial.println("Going to sleep now...");\n  esp_deep_sleep_start();\n}\n\nvoid loop() {\n  // Never reached\n}`,
  },
  {
    id: "analog-read",
    title: "Analog Read (ADC)",
    description: "Read analog values from a sensor using the ESP32's 12-bit ADC.",
    category: "GPIO",
    code: `#define SENSOR_PIN 36  // VP pin (ADC1_CH0)\n\nvoid setup() {\n  Serial.begin(115200);\n  analogReadResolution(12);  // 0-4095\n  analogSetAttenuation(ADC_11db);  // Full range 0-3.3V\n}\n\nvoid loop() {\n  int raw = analogRead(SENSOR_PIN);\n  float voltage = raw * (3.3 / 4095.0);\n  Serial.printf("Raw: %d  Voltage: %.2fV\\n", raw, voltage);\n  delay(500);\n}`,
  },
  {
    id: "i2c-scan",
    title: "I2C Scanner",
    description: "Scan the I2C bus to find all connected device addresses.",
    category: "Communication",
    code: `#include <Wire.h>\n\nvoid setup() {\n  Serial.begin(115200);\n  Wire.begin(21, 22); // SDA, SCL\n  Serial.println("I2C Scanner starting...");\n}\n\nvoid loop() {\n  int found = 0;\n  for (byte addr = 1; addr < 127; addr++) {\n    Wire.beginTransmission(addr);\n    if (Wire.endTransmission() == 0) {\n      Serial.printf("Device found at 0x%02X\\n", addr);\n      found++;\n    }\n  }\n  Serial.printf("Scan complete. %d devices found.\\n\\n", found);\n  delay(5000);\n}`,
  },
  {
    id: "pwm-led",
    title: "PWM LED Dimming",
    description: "Use LEDC PWM to smoothly dim an LED.",
    category: "GPIO",
    code: `#define LED_PIN 2\n#define PWM_CHANNEL 0\n#define PWM_FREQ 5000\n#define PWM_RESOLUTION 8  // 0-255\n\nvoid setup() {\n  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);\n  ledcAttachPin(LED_PIN, PWM_CHANNEL);\n}\n\nvoid loop() {\n  // Fade in\n  for (int duty = 0; duty <= 255; duty++) {\n    ledcWrite(PWM_CHANNEL, duty);\n    delay(10);\n  }\n  // Fade out\n  for (int duty = 255; duty >= 0; duty--) {\n    ledcWrite(PWM_CHANNEL, duty);\n    delay(10);\n  }\n}`,
  },
  {
    id: "spiffs-file",
    title: "SPIFFS File Read/Write",
    description: "Store and retrieve data on the ESP32's flash filesystem.",
    category: "Storage",
    code: `#include <SPIFFS.h>\n\nvoid setup() {\n  Serial.begin(115200);\n  if (!SPIFFS.begin(true)) {\n    Serial.println("SPIFFS mount failed!");\n    return;\n  }\n\n  // Write\n  File file = SPIFFS.open("/data.txt", FILE_WRITE);\n  file.println("Hello from ESP32!");\n  file.close();\n\n  // Read\n  file = SPIFFS.open("/data.txt", FILE_READ);\n  while (file.available()) {\n    Serial.write(file.read());\n  }\n  file.close();\n}\n\nvoid loop() {}`,
  },
];

export const snippetCategories = ["All", "GPIO", "Power", "Communication", "Storage"];

export const pinoutData = [
  { pin: "GPIO0", func: "Boot mode / Touch / ADC2_CH1", note: "Pulled up — held LOW for flash mode" },
  { pin: "GPIO1", func: "TX0 (Serial)", note: "Used by USB serial" },
  { pin: "GPIO2", func: "Boot LED / Touch / ADC2_CH2", note: "Must be LOW or floating for flash" },
  { pin: "GPIO3", func: "RX0 (Serial)", note: "Used by USB serial" },
  { pin: "GPIO4", func: "Touch / ADC2_CH0", note: "Safe for general use" },
  { pin: "GPIO5", func: "VSPI SS / Strapping", note: "Outputs PWM at boot" },
  { pin: "GPIO12", func: "HSPI MISO / ADC2_CH5", note: "Strapping pin — keep LOW at boot" },
  { pin: "GPIO13", func: "HSPI MOSI / ADC2_CH4 / Touch", note: "Safe for general use" },
  { pin: "GPIO14", func: "HSPI CLK / ADC2_CH6 / Touch", note: "Outputs PWM at boot" },
  { pin: "GPIO15", func: "HSPI SS / ADC2_CH3 / Touch", note: "Outputs PWM at boot" },
  { pin: "GPIO16", func: "RX2 (Serial2)", note: "Safe for general use" },
  { pin: "GPIO17", func: "TX2 (Serial2)", note: "Safe for general use" },
  { pin: "GPIO18", func: "VSPI CLK", note: "Safe for general use" },
  { pin: "GPIO19", func: "VSPI MISO", note: "Safe for general use" },
  { pin: "GPIO21", func: "I2C SDA", note: "Default I2C data" },
  { pin: "GPIO22", func: "I2C SCL", note: "Default I2C clock" },
  { pin: "GPIO23", func: "VSPI MOSI", note: "Safe for general use" },
  { pin: "GPIO25", func: "DAC1 / ADC2_CH8", note: "Analog output capable" },
  { pin: "GPIO26", func: "DAC2 / ADC2_CH9", note: "Analog output capable" },
  { pin: "GPIO27", func: "Touch / ADC2_CH7", note: "Safe for general use" },
  { pin: "GPIO32", func: "Touch / ADC1_CH4 / XTAL", note: "Safe — ADC1 (works with WiFi)" },
  { pin: "GPIO33", func: "Touch / ADC1_CH5 / XTAL", note: "Safe — ADC1 (works with WiFi)" },
  { pin: "GPIO34", func: "ADC1_CH6 (input only)", note: "No internal pull-up" },
  { pin: "GPIO35", func: "ADC1_CH7 (input only)", note: "No internal pull-up" },
  { pin: "GPIO36 (VP)", func: "ADC1_CH0 (input only)", note: "No internal pull-up" },
  { pin: "GPIO39 (VN)", func: "ADC1_CH3 (input only)", note: "No internal pull-up" },
];
