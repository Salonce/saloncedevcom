# saloncedevcom (website)

## Features
1. To-do list
2. Weather app

## Run
1. For the weather app to work, you need to go to <a href="https://home.openweathermap.org/api_keys">openweathermap.org</a> and create an account. Free one is enough. Get an API key.

2. Create an **.env** file in the root folder with compose.yaml. Insert key-value pairs as in **.env.example** file. For testing purposes, you can use default values from the example file (except for the weather API).

3. In the command line enter the root folder. Type: **'docker compose up'**. 
Any time you change any user variables in **.env**, make sure you delete the volume before you do start the app again (or adjust the db user).

4. To access the website, enter **localhost:3000** in your web browser (or any different port that you specified in **ACCESS_PORT**).

## Tools
- Frontend: React, Typescript, Vite
- Reverse Proxy: Nginx,
- Backend: Java, Spring Boot
- Database: MySQL.

## Security info
This website implements same-site policy and CSRF protection (double cookie pattern).