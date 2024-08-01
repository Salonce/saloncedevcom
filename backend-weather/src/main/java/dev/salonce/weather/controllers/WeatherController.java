package dev.salonce.weather.controllers;

import dev.salonce.weather.dtos.City;
import dev.salonce.weather.dtos.WeatherData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.salonce.weather.services.WeatherService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/weather")
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping(value="/coordinates")
    public ResponseEntity<WeatherData> getWeatherByCoordinates(@RequestParam("latitude") String latitude, @RequestParam("longitude") String longitude){
        WeatherData weatherData = weatherService.getWeatherData(latitude, longitude);
        return ResponseEntity.ok(weatherData);
    }

    @GetMapping(value="/city")
    public ResponseEntity<List<City>> getWeatherByCityName(@RequestParam("city") String name) {
        List<City> cityList = weatherService.getCities(name);
        return ResponseEntity.ok(cityList);
    }
}
