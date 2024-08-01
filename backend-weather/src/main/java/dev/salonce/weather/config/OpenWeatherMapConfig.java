package dev.salonce.weather.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "weather-api-token")
public class OpenWeatherMapConfig {

    @Getter
    @Setter
    private String token;

    public String getByCoordinatesURL(String latitude, String longitude) {
        StringBuilder resourceUrlBuilder = new StringBuilder();
        resourceUrlBuilder.append("https://api.openweathermap.org/data/2.5/weather?lat=")
                .append(latitude)
                .append("&lon=")
                .append(longitude)
                .append("&units=metric")
                .append("&appid=")
                .append(token);
        return resourceUrlBuilder.toString();
    }

    public String getByCityURL(String cityName){
        StringBuilder resourceUrlBuilder = new StringBuilder();
        resourceUrlBuilder.append("http://api.openweathermap.org/geo/1.0/direct?q=")
                .append(cityName)
                .append("&limit=5&appid=")
                .append(token);
        return resourceUrlBuilder.toString();
    }
}