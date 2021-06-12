# TalentQL Assessment

Backend REST API on Node.js 14.16.0 + Express.js + Mongoose.

## Quick Start to run locally

## Clone Repo

## Run npm install

## Setup Mongodb(Atlas or compass). Get connection string/url

## Create .env file

    Create .env file in project folder
    Enter these lines:

      DB_STRING = mongodb://localhost:27017/talentql
      DB_STRING_PROD = mongodb db live for production
      NODE_ENV = development or production
      JWT_SECRET=thisisasamplesecret
      JWT_ACCESS_EXPIRATION_MINUTES=3
      JWT_REFRESH_EXPIRATION_DAYS=30
      DB_TEST_STRING = mongodb://localhost:27017/talentqltest

## Start App
    npm start for production
    npm run dev - development
## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.
Note the documentation is available only when the app is run in development.



## Validation

Request data is validated using [Joi](https://joi.dev/).
The validation schemas are defined in the `/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

## Test
  npm run test
