package dev.salonce.weather.dtos;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class WeatherData implements Serializable {
    private Coord coord;
    private List<WeatherObj> weather;
    private String base;
    private Main main;
    private int visibility;
    private Wind wind;
    private Rain rain;
    private Clouds clouds;
    private long dt;
    private Sys sys;
    private int timezone;
    private int id;
    private String name;
    private int cod;
}

@Data
class Coord {
    private double lon;
    private double lat;
}

@Data
class WeatherObj {
    private int id;
    private String main;
    private String description;
    private String icon;
}

@Data
class Main {
    private double temp;
    private double feels_like;
    private double temp_min;
    private double temp_max;
    private int pressure;
    private int humidity;
    private int sea_level;
    private int grnd_level;
}

@Data
class Rain {
    private double oneHour;
}

@Data
class Clouds {
    private int all;
}

@Data
class Wind {
    private double speed;
    private int deg;
    private double gust;
}

@Data
class Sys {
    private int type;
    private int id;
    private String country;
    private long sunrise;
    private long sunset;
}