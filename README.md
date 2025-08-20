[![CI](https://github.com/carlosmaccarrone/MacMovies/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosmaccarrone/MacMovies/actions/workflows/ci.yml)
🎬 [Live Demo](https://carlosmaccarrone.github.io/MacMovies/) – Check out the app running in your browser!

# MacMovies

A minimal React app demo by **Carlos Maccarrone**.

## Overview

MacMovies is a lightweight React application that combines simulated authentication with real movie exploration.
The flow starts with a functional login, and once authenticated, the user can access a navigation bar with the following sections:

- Home
- Genre
- News
- Search
- Logout

All movie-related content (posters, metadata, reviews) is dynamically fetched from a real backend through the TMDb API.
Session management is handled with React context, ensuring a clean and predictable global state.

## Features

- Functional login page with session management via React context
- User data fetched from a local JSON file (/public/users.json) to simulate backend authentication
- Backend based password verification with hashed values
- Movie data (posters, metadata, reviews) dynamically fetched from a real backend (TMDb API)
- Modular CSS using **CSS Modules** (`style-loader` + `css-loader`)
- Jest testing suite configured for ESM modules, with mocks and fixtures to simulate components and routes
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