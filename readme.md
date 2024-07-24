# saloncedevcom (website)

## Features
1. To-do list

## Run
1. Create an **.env** file in the root folder with compose.yaml and insert key-value pairs as in **.env.example** file. For testing purposes, you can use default values from the example file. 
2. In the command line enter the root folder. Type: **'docker compose up'**. Wait for images to create and all containers to run. They will start in a sequence:
*database -> backend -> frontend*.
3. Enter **localhost:3000** in the address bar of a web browser (or a different port, as specified in **ACCESS_PORT** variable in the **.env** file).

## Tools
- Frontend: React, Typescript, Vite
- Reverse Proxy: Nginx,
- Backend: Java, Spring Boot
- Database: MySQL.