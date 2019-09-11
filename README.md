# Adonis API Test application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
cp .env.example .env

npm install
npx adonis migration:run
npx adonis seed
```
## Run Server

To run the server in development env run the following

```bash
npx adonis serve --dev
```

Or run the following to avoid any refresh of the application

```bash
npm start
```

## Setup

## User

After running the seed command you could login into the system using the following credentials

```bash
user: jsinnerx@gmail.com
pass: admin
```

## Tests

There's missing unit tests and functional tests (endpoints). If I had had more time I've could finish them. But, there is a directory (postman-tests) where you can see the tests I've made using Postman.

https://adonisjs.com/docs/4.1/testing

## Swagger

You could get into this URL http://localhost:4000/docs and review the list of endpoints created.
