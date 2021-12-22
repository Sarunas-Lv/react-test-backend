## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Routes](#routes)

## General info

This is a back-end for one of react tests. If you want to be able to run it use backend from https://github.com/Sarunas-Lv/react-test-frontend following setup instructions.

## Technologies

Project is created using:

- "colors": "^1.4.0",
- "cors": "^2.8.5",
- "dotenv": "^10.0.0",
- "express": "^4.17.1",
- "mongoose": "^6.0.5",
- "node": "^16.9.1"
- "nodemon": "^2.0.12"

## Setup

1. To run this project firstly create .env file in 2_backend folder. There set PORT = 5000 and MONGODB_URI = 'YOUR MONGO DB URI'
2. Now open integrated terminal navigate to directory and instal node_modules by runing 'npm i'
3. to start your backend run 'npm run nodemon'
4. Now navigate to frontend that you can find in https://github.com/Sarunas-Lv/react-test-frontend and follow the steps for it's setup. If frontend is already running, simply refresh the page.

## Routes

GET:     /api/cars              | Get all cars
         /api/users/:id         | Get single user based on id

POST:    /api/users/signup      | Register new user
         /api/users/login       | Log in existing user

PUT:     /api/cars/delete/:id   | Delete single car based on it's id (for embeded DB with one collention)
         /api/cars/add/:id      | Add single car to user based on his id

DELETE:  /api/cars/delete/:id   | Delete single car based on it's id (for listed DB with multiple collections)
