const API_KEY = "b1b15e88fa797225412429c1c50c122a1"; // Demo key - replace with your own from openweathermap.org

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  temperature: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface ForecastData {
  city: string;
  country: string;
  items: ForecastItem[];
}

function mapWeatherResponse(data: any): WeatherData {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
    pressure: data.main.pressure,
    visibility: Math.round((data.visibility || 0) / 1000),
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
    dt: data.dt,
  };
}

function mapForecastResponse(data: any): ForecastData {
  const daily: ForecastItem[] = [];
  const seen = new Set<string>();

  for (const item of data.list) {
    const date = new Date(item.dt * 1000).toDateString();
    if (seen.has(date)) continue;
    seen.add(date);
    if (daily.length >= 5) break;

    daily.push({
      dt: item.dt,
      temperature: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed * 3.6),
    });
  }

  return {
    city: data.city.name,
    country: data.city.country,
    items: daily,
  };
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) {
    if (res.status === 404) throw new Error("City not found. Please check the name and try again.");
    throw new Error("Failed to fetch weather data. Please try again.");
  }
  return mapWeatherResponse(await res.json());
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch weather for your location.");
  return mapWeatherResponse(await res.json());
}

export async function fetchForecastByCity(city: string): Promise<ForecastData> {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch forecast data.");
  return mapForecastResponse(await res.json());
}

export async function fetchForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch forecast data.");
  return mapForecastResponse(await res.json());
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

export function getLocalTime(timezone: number): string {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const local = new Date(utc + timezone * 1000);
  return local.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function isNightTime(data: WeatherData): boolean {
  return data.dt < data.sunrise || data.dt > data.sunset;
}

export function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((c) => 0x1f1e6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}
