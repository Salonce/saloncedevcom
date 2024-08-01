package dev.salonce.weather.dtos;

import lombok.Data;

@Data
public class Weather {
    public Weather(WeatherData weatherData) {
        this.city = null;
        this.weatherData = weatherData;
    }

    public Weather(City city, WeatherData weatherData) {
        this.city = city;
        this.weatherData = weatherData;
    }

    private City city;
    private WeatherData weatherData;
}
