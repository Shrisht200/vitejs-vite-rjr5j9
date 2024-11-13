export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
  };
}

export interface GeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}