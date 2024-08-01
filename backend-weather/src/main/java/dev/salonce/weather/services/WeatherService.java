package dev.salonce.weather.services;

import dev.salonce.weather.dtos.City;
import dev.salonce.weather.dtos.WeatherData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final WeatherAPIService weatherAPIService;

    public List<City> getCities(String cityName){
        List<City> cityList = weatherAPIService.requestCityList(cityName);
        return cityList;
    }

    public WeatherData getWeatherData(String latitude, String longitude){
        return weatherAPIService.requestLocation(latitude, longitude);
    }
}

