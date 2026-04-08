import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind, Eye } from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  "01": Sun,
  "02": Cloud,
  "03": Cloud,
  "04": Cloud,
  "09": CloudDrizzle,
  "10": CloudRain,
  "11": CloudLightning,
  "13": CloudSnow,
  "50": Wind,
};

const WeatherIcon = ({ iconCode, size = 64, className = "" }: WeatherIconProps) => {
  const code = iconCode.slice(0, 2);
  const isNight = iconCode.endsWith("n");
  const IconComponent = iconMap[code] || Cloud;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className={`${isNight ? "text-accent" : "text-accent"} drop-shadow-lg`}>
        <IconComponent size={size} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default WeatherIcon;
