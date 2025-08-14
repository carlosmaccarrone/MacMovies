[![CI](https://github.com/carlosmaccarrone/MacMovies/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosmaccarrone/MacMovies/actions/workflows/ci.yml)

# MacMovies

A minimal React app demo by **Carlos Maccarrone**.

## Overview

MacMovies is a lightweight React application demonstrating a functional login system and user management simulation.  
It uses modern JavaScript and frontend best practices to showcase clean architecture and modular design.

At the moment, the app contains a **functional login page** that fetches user data from `/public/users.json` to simulate a backend.  
Passwords are stored as hashes, and verification is done by comparing `hash == hash` like a backend-based authentication system.  
A React **context** is used to manage session and user state.

## Features

- Functional login page with session management via React context
- User data fetched from a local JSON file (`/public/users.json`)
- Backend based password verification with hashed values
- Modular CSS using **CSS Modules** (`style-loader` + `css-loader`)
- Fully ESM-based project structure

## Technologies Used

- React  
- Webpack  
- Babel  
- React Router  
- Jest (for testing)  
- cross-env  
- CSS Modules  
- copy-webpack-plugin (for copying static assets to the build)

## Setup

1. Clone the repository:

 	git clone <repo-url>

2. Install dependencies:

 	npm install

3. Start the development server:

 	npm start

The app should now be running at `http://localhost:3000`.


## Testing

Run the unit tests using:

 	npm test

Jest is configured for ESM and includes mocks for assets when needed.


## License

MIT © Carlos Maccarrone


**Disclaimer – Media Assets:**  
All movie posters, thumbnails, and related images used in this project are the property of their respective copyright holders.  
They are included here for demonstration and educational purposes only.  
No copyright infringement is intended, and this project does not claim ownership of any third-party media assets.

**Disclaimer – Fonts:**  
All fonts used in this project are the property of their respective owners and are subject to their own license terms.  
They are included here for demonstration purposes only.  
If you plan to reuse this code, please ensure you have the appropriate rights to use and distribute the fonts.


## Credits

Movie and poster data provided by TMDb — The Movie Database® (https://www.themoviedb.org/).