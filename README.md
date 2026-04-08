# 🌦️ Weather App
<img width="1920" height="1031" alt="screencapture-sunshine-sleuth-lovable-app-2026-04-08-16_53_39" src="https://github.com/user-attachments/assets/e6d16b8e-7320-476b-a9da-c9493cc4d989" />

A modern and responsive Weather Application built with React + Vite that provides real-time weather updates and forecasts.

---

## 🚀 Live Demo

https://sunshine-sleuth.lovable.app/

---

## 📌 Overview

This Weather App allows users to search for any city and get real-time weather information including temperature, conditions, humidity, and wind speed.

It also supports geolocation-based weather detection and a 5-day forecast, making it a complete and user-friendly weather solution.

---

## 🛠️ Tech Stack

* ⚛️ React JS (Functional Components + Hooks)
* ⚡ Vite (Fast Build Tool)
* 🎨 Tailwind CSS (Modern Styling)
* 🌐 OpenWeather API / WeatherAPI
* 🔗 Axios / Fetch (API Calls)

---

## ✨ Features

### 🔹 Basic Features

* 🔍 Search weather by city name
* 🌡️ Display temperature in Celsius
* ☁️ Weather condition & icon
* 💧 Humidity
* 🌬️ Wind speed

### 🔹 Advanced Features

* 📍 Get weather using current location (Geolocation API)
* 🌙 Dark / Light mode toggle
* 📅 5-day weather forecast
* 🔄 Auto-refresh weather data
* ⚠️ Error handling (invalid city, API issues)
* ⏳ Loading states with spinner

### 🔹 UI/UX

* 📱 Fully responsive design
* 🎯 Clean and minimal card layout
* ✨ Smooth user experience
* 🎨 Tailwind CSS styling

---

## 📂 Folder Structure

```
src/
 ┣ components/
 ┃ ┣ SearchBar.jsx
 ┃ ┣ WeatherCard.jsx
 ┃ ┗ Forecast.jsx
 ┣ services/
 ┃ ┗ weatherApi.js
 ┣ App.jsx
 ┗ main.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add API Key

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

Get your API key from:
👉 https://openweathermap.org/api

---

### 4️⃣ Run the App

```bash
npm run dev
```

---

## 🧠 React Concepts Used

* useState for state management
* useEffect for API calls
* Conditional rendering
* Component-based architecture
* Custom API service handling

---

## 🎯 Key Highlights

* Real-time API integration
* Clean and reusable components
* Beginner-friendly and scalable structure
* Production-ready setup

---

## 💡 Future Improvements

* 🌍 Multi-language support
* 📊 Weather charts & analytics
* 🔔 Weather alerts & notifications
* 🗺️ Map integration

---

## 🚀 Deployment

You can deploy this project easily on **Vercel**:

```bash
npm run build
```

Then upload to Vercel or use GitHub integration.

---

## 👨‍💻 Author

**Krish Rawal**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
