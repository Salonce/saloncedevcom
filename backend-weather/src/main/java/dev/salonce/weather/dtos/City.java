package dev.salonce.weather.dtos;

import lombok.Data;

import java.util.Map;

@Data
public class City {
    private String name;
    private Map<String, String> localNames;
    private double lat;
    private double lon;
    private String country;
    private String state;
}

