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

## Project Structure

root/
├── src/
│   ├─ components/      # React components
│   ├─ contexts/        # Session & user context
│   ├─ pages/           # Page components (Login, Home, etc.)
│   ├─ styles/          # Global styles
│   ├─ App.jsx          # Main app component
│   ├─ AppRoutes.jsx    # Routes definition
│   └─ index.jsx        # App entry point
├── public/
│   ├─ assets/          # Images, icons, logos
│   ├─ images_large/    # Movie posters
│   ├─ images_thumb/    # Movie thumbnails
│   ├─ index.html       # Main HTML file
│   ├─ movies.json      # Simulated backend data for movies
│   └─ users.json       # Simulated backend data for users
├── babel.config.json
├── jest.config.mjs
├── jest.setup.mjs
├── jsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── webpack.config.mjs


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