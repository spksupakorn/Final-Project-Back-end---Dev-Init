# Awesome Project Build with TypeORM

project setup

npm i -g typeorm
npx typeorm init --name restAPi --database postgres
npm i
npx typeorm migration:create ./src/migration/user

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


