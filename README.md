# Final-Project-Back-end---Dev-Init

To-Do-List application api &amp; unit test

For the development of an API for a web application that allows users to manage their personal information, 

including creating a To-do List and Logs for recording daily events, as well as managing their own calendar.

# Awesome Project Build with TypeORM

project setup

- npm i -g typeorm
 
- npx typeorm init --name restAPi --database postgres

- npm i
  
- npx typeorm migration:create ./src/migration/user


Steps to run this project:

1. Setup database settings inside `data-source.ts` file
2. Run `npm start` command

docker compose 
FOR DEV
-  docker compose -f docker-compose.dev.yml up
-  docker compose -f docker-compose.dev.yml up --build
FOR PRD
-  docker compose up
-  docker compose up --build


Test Case:

- POST /api/v1/auth/signup

- POST /api/v1/auth/login

- GET /api/v1/logs

- GET /api/v1/logs/:id

- POST /api/v1/logs

- PUT /api/v1/logs/:id

- DELETE /api/v1/logs/:id

- GET /api/v1/todos

- GET /api/v1/todos/:id

- POST /api/v1/todos

- PUT /api/v1/todos/:id

- DELETE /api/v1/todos/:id

- GET /api/v1/events

- GET /api/v1/events/:id

- POST /api/v1/events

- PUT /api/v1/events/:id

- DELETE /api/v1/events/:id