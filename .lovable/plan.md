
# ESP32 Hub – Project Documentation & Live Dashboard

A developer-focused ESP32 website with a dark, hacker-style aesthetic featuring terminal-inspired UI elements, monospace fonts, and code-block styling.

## Pages & Features

### 1. Home / Landing Page
- Hero section with a bold ESP32 tagline and animated terminal-style text effect
- Quick navigation cards linking to all major sections
- Dark theme with green/cyan accent colors for a tech/hacker feel

### 2. Tutorials & Guides Section
- List of tutorial cards with title, difficulty badge, and preview image
- Individual tutorial pages with formatted content, embedded code blocks with syntax highlighting, and step-by-step instructions
- Filter/search by category (WiFi, Bluetooth, Sensors, GPIO, etc.)
- Content will be hardcoded initially (can be made dynamic later with a backend)

### 3. Project Gallery
- Grid of project cards with thumbnail images, title, and short description
- Detail view for each project with full write-up, images, components list, and wiring info
- Tags/categories for filtering (IoT, Home Automation, Robotics, etc.)

### 4. Live Sensor Dashboard
- Real-time data display with gauges, charts, and status indicators using Recharts
- Support for connecting to an ESP32 via WebSocket (user provides their ESP32's WebSocket URL)
- Mock/demo mode with simulated sensor data for when no device is connected
- Display temperature, humidity, light levels, or custom sensor readings
- Connection status indicator

### 5. Code & Circuit Reference
- Pinout diagram reference for common ESP32 boards
- Reusable code snippets with copy-to-clipboard functionality
- Common circuit patterns and wiring guides

### 6. Navigation & Layout
- Sticky top navbar with terminal-style branding
- Sidebar navigation on documentation pages
- Responsive design for mobile and desktop
- Dark mode by default with optional light mode toggle

## Design System
- **Theme**: Dark background with green/cyan terminal-style accents
- **Typography**: Monospace font for headings and code, clean sans-serif for body text
- **Components**: Terminal-window styled cards, glowing borders, code-block aesthetics
- **Animations**: Subtle typing effects, fade-ins, and pulse indicators for live data
