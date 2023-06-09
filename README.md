# NUBCEO

## My Node.js Express App

This is a Node.js Express application for managing TV shows and movies.

### Getting Started

To get started with this application, follow the instructions below.

### Prerequisites

- Node.js (version X.X.X)
- MongoDB (version X.X.X)

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/your-repository.git

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

##API Endpoints
POST /auth/login: Login with username and password to obtain an access token.
POST /tvshows: Create a new TV show.
GET /tvshows: Get all TV shows.
GET /tvshows/:id: Get a specific TV show by ID.
PUT /tvshows/:id: Update a specific TV show by ID.
DELETE /tvshows/:id: Delete a specific TV show by ID.
POST /tvshows/:id/episodes: Create a new episode for a specific TV show.
GET /tvshows/:id/episodes: Get all episodes for a specific TV show.
GET /tvshows/:id/episodes/:episodeId: Get a specific episode for a specific TV show.
PUT /tvshows/:id/episodes/:episodeId: Update a specific episode for a specific TV show.
DELETE /tvshows/:id/episodes/:episodeId: Delete a specific episode for a specific TV show.
POST /movies: Create a new movie.
GET /movies: Get all movies.
GET /movies/:id: Get a specific movie by ID.
PUT /movies/:id: Update a specific movie by ID.
DELETE /movies/:id: Delete a specific movie by ID.
##Project Information
Name: nubceo
Version: 1.0.0
Description: Nubceo Challenge
Author: Pehuen Assalone
License: ISC
##Development
###Dev Dependencies:
@types/express: ^4.17.17
@typescript-eslint/eslint-plugin: ^5.59.9
eslint: ^8.42.0
eslint-config-standard-with-typescript: ^35.0.0
eslint-plugin-import: ^2.27.5
eslint-plugin-n: ^15.7.0
eslint-plugin-promise: ^6.1.1
faker: ^5.5.3
nodemon: ^2.0.22
tsc-watch: ^6.0.4
typescript: ^5.1.3

###License
This project is licensed under the MIT License.

