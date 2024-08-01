# WeatherAndClothes

Website allowing users to access and manage their
virtual wardrobes. Additionally, it offers a way
to check weather in specific places by using an
external API. Includes testing and OAuth2.
Built in accordance with REST principles.

### Technologies used:
- Java 17
- Spring, Spring Boot
- HTML, Bootstrap, Thymeleaf
- JPQL, Hibernate, MySQL
- JUnit, Mockito, AssertJ
- Docker

## How to run? 
To run the app you will need a weatherAPI key and google OAuth2 credentials. 
1. Register on https://openweathermap.org/api (free version is enough).
- Go to your profile -> API KEYs
- Get a key for resource requests.
2. On https://console.cloud.google.com/apis/
- Create a new project.
- Fill the OAuth2 consent screen with necessary data. If you need help, visit https://developers.google.com/workspace/guides/configure-oauth-consent
- Create OAuth client ID credentials for a web application, while doing that, add Authorized redirect URIs to: http://localhost:8080/login/oauth2/code/google <br>
- If you need help, visit https://developers.google.com/workspace/guides/create-credentials
- Now get CLIENT ID and CLIENT SECRET.


## Run in IDE:
1. Use JDK version 17.
2. Have MySQL DB installed.
3. Provide all necessary configuration information in the <b><i>src/main/resources/application.properties</i></b> file either directly or pass it through your system environment variables (by default).

## Run in Docker:
1. Create file ' <b><i>.env</i></b> ' in the root folder of the project. Its path is included in <b><i>.gitignore</i></b>.
2. Open it (e.g. in notepad) and fill with environment variables like in the example below:

```dotenv
#DATABASE
MYSQL_DB_NAME=mysqldb
MYSQL_DB_PASSWORD=password
MYSQL_DB_USERNAME=username

#PORT MAPPING
ACCESS_PORT=8080

#GOOGLE API CREDENTIALS
WAW_GOOGLE_CLIENT_ID=your_google_client_id
WAW_GOOGLE_CLIENT_SECRET=your_google_client_secret

#WEATHER API
WEATHER_API_TOKEN=your_weather_api_token

```

3. Open bash/cmd, go to the root folder of the project and type commands: 
- compose build
- compose up
4. Enter the app through http://localhost:8080/ (or different port as specified in ACCESS_PORT in .env file)


## Screenshots:

|                          Wardrobe                           |                         Adding item                         |                           Weather                           |
|:-----------------------------------------------------------:|:-----------------------------------------------------------:|:-----------------------------------------------------------:|
| ![1](src/main/resources/static/images/git_repository/1.png) | ![2](src/main/resources/static/images/git_repository/2.png) | ![3](src/main/resources/static/images/git_repository/3.png) |
