import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";
import ThemeToggle from "@/components/ThemeToggle";
import {
  WeatherData,
  ForecastData,
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
} from "@/services/weatherApi";
import { CloudSun, Loader2, CloudOff } from "lucide-react";
import weatherBg from "@/assets/weather-bg.jpg";

const AUTO_REFRESH_MS = 5 * 60 * 1000; // 5 minutes

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCity, setLastCity] = useState<string>("");
  const [isDark, setIsDark] = useState(false);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const fetchData = useCallback(
    async (fetchWeather: () => Promise<WeatherData>, fetchFc: () => Promise<ForecastData>) => {
      setLoading(true);
      setError(null);
      try {
        const [w, f] = await Promise.all([fetchWeather(), fetchFc()]);
        setWeather(w);
        setForecast(f);
        setLastCity(w.city);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    (city: string) => {
      fetchData(() => fetchWeatherByCity(city), () => fetchForecastByCity(city));
    },
    [fetchData]
  );

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchData(
          () => fetchWeatherByCoords(latitude, longitude),
          () => fetchForecastByCoords(latitude, longitude)
        );
      },
      () => setError("Unable to get your location. Please allow location access.")
    );
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (!lastCity) return;
    const id = setInterval(() => {
      fetchData(() => fetchWeatherByCity(lastCity), () => fetchForecastByCity(lastCity));
    }, AUTO_REFRESH_MS);
    return () => clearInterval(id);
  }, [lastCity, fetchData]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={weatherBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CloudSun className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Weather</h1>
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} onGeolocate={handleGeolocate} isLoading={loading} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="glass-card rounded-2xl p-12 flex flex-col items-center gap-4 animate-fade-in">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-muted-foreground">Fetching weather data...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-3 animate-fade-in text-center">
            <CloudOff className="h-10 w-10 text-destructive" />
            <p className="text-foreground font-medium">{error}</p>
            <p className="text-muted-foreground text-sm">Try searching for a different city.</p>
          </div>
        )}

        {/* Weather Data */}
        {weather && !loading && !error && (
          <div className="space-y-4">
            <WeatherCard data={weather} />
            {forecast && <Forecast data={forecast} />}
          </div>
        )}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div className="glass-card rounded-2xl p-12 flex flex-col items-center gap-4 animate-fade-in text-center">
            <CloudSun className="h-16 w-16 text-primary/50 animate-pulse-slow" />
            <div>
              <p className="text-foreground font-medium text-lg">Welcome to Weather</p>
              <p className="text-muted-foreground text-sm mt-1">
                Search for a city or use your location to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
