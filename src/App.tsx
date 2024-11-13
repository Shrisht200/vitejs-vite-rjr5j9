import { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import type { WeatherData, GeocodingResult } from './types/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError('');
    try {
      // First, get coordinates for the city
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      const geocodingData = await geocodingResponse.json();

      if (!geocodingData.results?.[0]) {
        throw new Error('City not found');
      }

      const locationData = geocodingData.results[0];
      setLocation(locationData);

      // Then, get weather data for those coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setLocation(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Weather Now</h1>
        
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {weather && location && (
          <WeatherCard
            cityName={location.name}
            countryName={location.country}
            weather={weather}
          />
        )}
      </div>
    </div>
  );
}

export default App;