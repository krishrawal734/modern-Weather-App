import { Droplets, Wind, Thermometer, Eye, Gauge, Sunrise, Sunset } from "lucide-react";
import { WeatherData, getLocalTime, getCountryFlag, getWeatherIconUrl } from "@/services/weatherApi";
import WeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const localTime = getLocalTime(data.timezone);
  const flag = getCountryFlag(data.country);

  const sunriseTime = new Date(data.sunrise * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunsetTime = new Date(data.sunset * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {data.city} {flag}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {data.country} · {localTime}
          </p>
        </div>
        <WeatherIcon iconCode={data.icon} size={56} />
      </div>

      {/* Temperature */}
      <div className="flex items-end gap-3 mb-2">
        <span className="text-6xl sm:text-7xl font-light text-foreground leading-none">
          {data.temperature}°
        </span>
        <div className="pb-2">
          <span className="text-muted-foreground text-sm">
            Feels like {data.feelsLike}°C
          </span>
        </div>
      </div>
      <p className="capitalize text-foreground/80 text-lg mb-1">{data.description}</p>
      <div className="flex gap-3 text-sm text-muted-foreground mb-6">
        <span>H: {data.tempMax}°</span>
        <span>L: {data.tempMin}°</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatItem icon={Droplets} label="Humidity" value={`${data.humidity}%`} />
        <StatItem icon={Wind} label="Wind" value={`${data.windSpeed} km/h`} />
        <StatItem icon={Gauge} label="Pressure" value={`${data.pressure} hPa`} />
        <StatItem icon={Eye} label="Visibility" value={`${data.visibility} km`} />
        <StatItem icon={Sunrise} label="Sunrise" value={sunriseTime} />
        <StatItem icon={Sunset} label="Sunset" value={sunsetTime} />
      </div>
    </div>
  );
};

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-subtle rounded-xl p-3 flex items-center gap-3">
      <Icon className="h-5 w-5 text-primary shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default WeatherCard;
