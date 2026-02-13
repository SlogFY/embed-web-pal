export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  components: string[];
  wiring: string;
}

export const projects: Project[] = [
  {
    id: "weather-station",
    title: "WiFi Weather Station",
    description: "A standalone weather station that reports temperature, humidity, and pressure to a web dashboard.",
    fullDescription: `This project creates a complete weather monitoring station using the ESP32 and multiple environmental sensors. Data is served via a built-in web server and can also be pushed to cloud services.\n\n## Features\n- Temperature, humidity (DHT22) and barometric pressure (BMP280)\n- Built-in web dashboard accessible from any browser on the network\n- Optional MQTT publishing for cloud integration\n- OLED display for local readings\n- Battery-powered option with deep sleep`,
    tags: ["IoT", "Sensors", "WiFi"],
    components: ["ESP32 DevKit", "DHT22", "BMP280", "0.96\" OLED SSD1306", "Breadboard", "Jumper wires"],
    wiring: "DHT22: Data→GPIO4 (10kΩ pull-up) | BMP280: SDA→GPIO21, SCL→GPIO22 | OLED: SDA→GPIO21, SCL→GPIO22 (shared I2C)",
  },
  {
    id: "smart-relay",
    title: "Smart Home Relay Controller",
    description: "Control appliances remotely via WiFi with a relay module and web interface.",
    fullDescription: `Build a smart relay controller that lets you switch appliances on/off from your phone or computer.\n\n## Features\n- 4-channel relay control\n- Web-based control panel\n- MQTT integration for Home Assistant\n- Physical button override\n- Status LED indicators`,
    tags: ["Home Automation", "WiFi"],
    components: ["ESP32 DevKit", "4-Channel Relay Module", "5V Power Supply", "Terminal blocks", "LED indicators"],
    wiring: "Relay IN1→GPIO26, IN2→GPIO27, IN3→GPIO14, IN4→GPIO12 | VCC→5V, GND→GND",
  },
  {
    id: "robot-car",
    title: "Bluetooth RC Car",
    description: "A remote-controlled car driven via Bluetooth from a mobile app.",
    fullDescription: `A fun robotics project using the ESP32's Bluetooth capability to control a two-motor car chassis.\n\n## Features\n- Bluetooth Classic serial control\n- L298N motor driver for dual DC motors\n- Variable speed control via PWM\n- Ultrasonic obstacle detection (optional)\n- Compatible with common BT serial terminal apps`,
    tags: ["Robotics", "Bluetooth"],
    components: ["ESP32 DevKit", "L298N Motor Driver", "2WD Car Chassis Kit", "HC-SR04 Ultrasonic (optional)", "7.4V Li-ion Battery"],
    wiring: "Motor A: ENA→GPIO13, IN1→GPIO27, IN2→GPIO26 | Motor B: ENB→GPIO25, IN3→GPIO33, IN4→GPIO32 | HC-SR04: Trig→GPIO5, Echo→GPIO18",
  },
  {
    id: "plant-monitor",
    title: "Plant Monitoring System",
    description: "Monitor soil moisture, light, and temperature for your plants with alerts.",
    fullDescription: `Keep your plants alive with automated monitoring! This project reads soil moisture, ambient light, and temperature, then sends alerts when conditions need attention.\n\n## Features\n- Capacitive soil moisture sensor (corrosion-resistant)\n- LDR for light level measurement\n- Temperature monitoring\n- WiFi notifications via webhook/email\n- Deep sleep for battery optimization`,
    tags: ["IoT", "Sensors"],
    components: ["ESP32 DevKit", "Capacitive Soil Moisture Sensor v1.2", "LDR + 10kΩ resistor", "DHT11", "3.7V Li-Po Battery"],
    wiring: "Soil Sensor: AO→GPIO36 | LDR: Divider output→GPIO39 | DHT11: Data→GPIO4",
  },
];

export const projectTags = ["All", "IoT", "Sensors", "WiFi", "Home Automation", "Robotics", "Bluetooth"];
