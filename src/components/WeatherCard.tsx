import { WiThermometer, WiHumidity, WiStrongWind, WiRaindrop } from 'react-icons/wi';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  cityName: string;
  countryName: string;
  weather: WeatherData;
}

export default function WeatherCard({ cityName, countryName, weather }: WeatherCardProps) {
  const { temperature_2m, relative_humidity_2m, wind_speed_10m, precipitation } = weather.current;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{cityName}</h2>
        <p className="text-gray-600">{countryName}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <WiThermometer className="text-3xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="font-semibold">{temperature_2m}°C</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <WiHumidity className="text-3xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-semibold">{relative_humidity_2m}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <WiStrongWind className="text-3xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="font-semibold">{wind_speed_10m} km/h</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <WiRaindrop className="text-3xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Precipitation</p>
            <p className="font-semibold">{precipitation} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
}