import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryMapper from '../Components/CountryMapper';
import SearchBar from '../Components/SearchBar';
import CitySearchBar from '../Components/CitySearchBar';

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

const DisplayWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSearchBar, setShowSearchBar] = useState(true);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`/weather/coordinates?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data');
      setWeatherData(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Check weather</h2>
      <nav className="navbar navbar-light">
        <div className="container">
          <div className="d-flex justify-content-center w-100">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-outline-dark" onClick={() => setShowSearchBar(true)}>
                By coordinates
              </button>
              <button className="btn btn-outline-dark" onClick={() => setShowSearchBar(false)}>
                By city name
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {showSearchBar ? (
        <SearchBar onSearch={fetchWeatherData} />
      ) : (
        <CitySearchBar onSearch={fetchWeatherData} />
      )}
      <div className="container mt-4">
        {error && <p className="text-danger mt-3">{error}</p>}
        {weatherData && (
          <div>
            <h2>Weather Details</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Name:</strong> {weatherData.name}</li>
              <li className="list-group-item"><strong>Country:</strong> <CountryMapper countryCode={weatherData.sys.country} /></li>
              <li className="list-group-item"><strong>Coordinates:</strong> Lat: {weatherData.coord.lat}, Lon: {weatherData.coord.lon}</li>
              <li className="list-group-item"><strong>Weather:</strong> {weatherData.weather[0].main} - {weatherData.weather[0].description}</li>
              <li className="list-group-item"><strong>Temperature:</strong> {weatherData.main.temp}°C</li>
              <li className="list-group-item"><strong>Pressure:</strong> {weatherData.main.pressure} hPa</li>
              <li className="list-group-item"><strong>Humidity:</strong> {weatherData.main.humidity}%</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayWeather;