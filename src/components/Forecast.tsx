import { ForecastData } from "@/services/weatherApi";
import WeatherIcon from "./WeatherIcon";

interface ForecastProps {
  data: ForecastData;
}

const Forecast = ({ data }: ForecastProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">5-Day Forecast</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {data.items.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = index === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" });
          const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

          return (
            <div
              key={item.dt}
              className="glass-subtle rounded-xl p-4 min-w-[110px] flex flex-col items-center gap-2 transition-transform hover:scale-105"
            >
              <p className="text-sm font-medium text-foreground">{dayName}</p>
              <p className="text-xs text-muted-foreground">{monthDay}</p>
              <WeatherIcon iconCode={item.icon} size={32} />
              <p className="text-lg font-bold text-foreground">{item.temperature}°</p>
              <div className="flex gap-1 text-xs text-muted-foreground">
                <span>{item.tempMax}°</span>
                <span>/</span>
                <span>{item.tempMin}°</span>
              </div>
              <p className="text-xs capitalize text-muted-foreground text-center leading-tight">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
