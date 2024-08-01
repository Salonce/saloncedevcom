package dev.salonce.weather.services;

import dev.salonce.weather.config.OpenWeatherMapConfig;
import dev.salonce.weather.dtos.City;
import dev.salonce.weather.dtos.WeatherData;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherAPIService {

    private final OpenWeatherMapConfig openWeatherMapConfig;

    public WeatherData requestLocation(String latitude, String longitude){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<WeatherData> response = restTemplate.getForEntity(openWeatherMapConfig.getByCoordinatesURL(latitude, longitude), WeatherData.class);
        return response.getBody();
    }

    public List<City> requestCityList(String cityName){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<City>> responseEntity = restTemplate.exchange(
                openWeatherMapConfig.getByCityURL(cityName),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<City>>() {}
        );
        return responseEntity.getBody();
    }
}
