# NUBCEO

## My Node.js Express App

This is a Node.js Express in TypeScript application for managing TV shows and movies.

### Getting Started

To get started with this application, follow the instructions below.

### Prerequisites

- Node.js (version 20.0.0)
- MongoDB 

### Installation

1. Clone the repository:

```
   git clone https://github.com/Pehuen87/nubceo.git
```
Navigate to the project directory:

```
    cd nubceo
```

2. Install the dependencies:

```
    npm install
```

3. Set up the environment variables:

Create a .env file in the root directory of the project.

Add the necessary environment variables in the .env file. For example:


```
PORT=3000
DB_CONNECTION_STRING=mongodb://localhost:<PORT>/<DATABASE>
JWT_SECRET=<SECRET_KEY>
```

4. Start the server:

```
npm start
```

5. Access the application at http://localhost:3000. or the PORT provided in .env file

## API Endpoints
#### AUTH
- POST /auth/login  Login with username and password to obtain an access token.
- POST /auth/token  Login with refresh token and obtain an access token.
#### TVSHOWS
- POST /tvshows  Create a new TV show.
- GET /tvshows  Get all TV shows.
- GET /tvshows/:id  Get a specific TV show by ID.
- GET /tvshows/:id/episodes  Get all episodes for a specific TV show.
- GET /tvshows/:id/episodes/:episodeId  Get a specific episode for a specific TV show.
#### MOVIES
- GET /movies  Get all movies.
- GET /movies/:id  Get a specific movie by ID.

## Project Information
- Name: nubceo
- Version: 1.0.0
- Description: Nubceo Challenge
- Author: Pehuen Assalone

## Development
###  Dependencies:
- eslint: ^8.42.0
- faker: ^5.5.3
- nodemon: ^2.0.22
- tsc-watch: ^6.0.4
- typescript: ^5.1.3

## Schema

### Movie
|Name|Type|
|----|-----|
|title|string|
|genre|string|
|trailer|string|
|plot|string|
|director|_ref to Director_|
|actors|_ref to Actor_|

### TVSHOWS
|Name|Type|
|----|-----|
title|string|
genre|string|
seasons|number|
plot|string|
episodes|Array of episodes |
actors|Array<_ref to Actor>|

### EPISODES
|Name|Type|
|----|-----|
|episodeId|string|
|title|string|
|director|_ref to Director_|
|season|number|

### Director & Actor
|Name|Type|
|----|-----|
|name|string|
|surname|string|
|bio|string|
|avatar|string|

