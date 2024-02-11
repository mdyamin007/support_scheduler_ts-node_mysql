# Support Scheduler [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=santoshshinde2012_node-boilerplate&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=santoshshinde2012_node-boilerplate)

Backend/API of Support Scheduler web application written in Node.js, TypeScript, MySQL


<!-- ## Purpose

Our main purpose with this Skeleton is to start server application with node js and typescript.

Try it!! I am happy to hear your feedback or any kind of new features. -->

## Common Features

- Quick start
- Integrated eslint, prettier and husky
- Global Error & Response Handler
- Simple and Standard scaffolding
- Based on Typescript Syntax
- Simple & Global Enviroment Configuration
- Request/Response Encryption & Decryption Implementation
- Easily Add new feature
- Integrated winston Logger
- Production Ready Skeleton
- Follwed Production Ready Best Practices: Security
- Added only used npm modules
- Swagger Documentation Support
- Unit & Integration Test Cases

## Core NPM Module

- [x] `express`, `@types/express`
- [x] `@types/node`
- [x] `typescript`
- [x] `dotenv`
- [x] `cors`
- [x] `helmet`
- [x] `http-status-codes`
- [x] `winston`, `@types/winston`
- [x] `swagger`, `swagger-ui-express`

# Start the application

![Workflow](https://github.com/santoshshinde2012/node-boilerplate/blob/master/wiki/environment.jpg?raw=true)

## Start The application in Development Mode

- Install MySQL and run in 3306 port or set .env file accordingly
- Clone the Application `git clone <url>`
- Install the dependencies `npm install`
- Start the application `npm run dev`

## Start The application in Production Mode

- Install docker application
- Build the images and run using `docker compose up`
- Before starting make sure to create and update your `.env.prod` values for your refrence just check `.env.example`
- Visit \<Your IP>:3307 and login to phpmyadmin using username `root` and password is blank.
- Copy all the contents from db.sql file and paste it to the SQL tab
- Done, now visit your server IP

## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **wiki/**                         | You can add project documentation and insructions file here |
| **src/**                          | Source files |
| **src/abstractions**              | Abstarct classes and Interfaces  |
| **src/components**                | REST API Components & Controllers  |
| **src/lib**                       | Reusable utilises and library source code like a logger|
| **src/middleware/**               | Express Middlewares like error handler feature |
| **src/config/**               | Database connection configuration |
| **src/controllers/**               | Express Controllers to handle request |
| **src/models/**               | Database Schema Models for MySQL |
| **src/repositories/**               | Functions for handling Queries of Database |
| **src/routes/**               | Express Routes for different endpoints |
| **src/utils/**               | Algorithm to generate schedule |
| **build/**                        | Compiled source files will be placed here |
| **tests/**                        | Test cases will be placed here |
| **tests/helpers/**                | Helpers for test cases will be placed here  |
| **tests/unit-tests/**             | Unit Test cases will be placed here  |
| **tests/integration-tests/**      | API routes (Integration) Test cases will be placed here|

## Workflow

![Workflow](https://github.com/santoshshinde2012/node-boilerplate/blob/master/wiki/boilerplate-components.jpg?raw=true)


## Encryption

Set the `APPLY_ENCRYPTION` environment variable to `true` to enable encryption.

## Swagger API Documentation

The swagger documentation is available at the following url `${host}/docs`:  

[http://localhost:8080/docs](http://localhost:8080/docs)
## Default System Health Status API

- `${host}/api/system/info` - Return the system information in response
- `${host}/system/time` - Return the current time in response
- `${host}/system/usage` - Return the process and system memory usage in response
- `${host}/system/process` -  Return the process details in response
- `${host}/system/error` - Return the error generated object in response

![Swagger API Documentation](https://github.com/santoshshinde2012/node-boilerplate/blob/master/wiki/swagger-api-documentation.jpg?raw=true)

## Refrences

- [Skeleton for Node.js Apps written in TypeScript](https://javascript.plainenglish.io/skeleton-for-node-js-apps-written-in-typescript-444fa1695b30)
- [Setup Eslint Prettier and Husky in Node JS Typescript Project](https://gist.github.com/santoshshinde2012/e1433327e5f7a58f98fe3e6651c4d5de)

## Notes

### 1. Why is my git pre-commit hook not executable by default?

- Because files are not executable by default; they must be set to be executable.

```
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

### 2. [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

- Don’t use deprecated or vulnerable versions of Express
- Use TLS
- Use Helmet
- Use cookies securely
- Prevent brute-force attacks against authorization
- Ensure your dependencies are secure
- Avoid other known vulnerabilities
- Additional considerations

### Please connect with me on LinkedIn [@mdyamin007](https://linkedin.com/in/mdyamin007) & [mdyamin007.github.io](https://mdyamin007.github.io/)