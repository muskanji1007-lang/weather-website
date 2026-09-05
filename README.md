# SKYORA - Weather Website

## Project Description

SKYORA is a responsive weather website built using HTML, CSS and JavaScript.

The website provides user authentication and a protected weather dashboard where authenticated users can search for a city and view current weather information and forecast data.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- Local Storage

## Features

- User Sign Up
- User Login
- Form Validation
- Authentication Token Storage
- Protected Weather Dashboard
- City Search
- Current Weather
- Weather Icon
- Forecast
- Loading States
- Error Handling
- Logout
- Responsive Design

## API Integration

The project uses the provided Weather & Authentication API.

### Authentication Endpoints

- Signup: POST `/api/auth/signup`
- Login: POST `/api/auth/login`
- User Profile: GET `/api/auth/profile`

### Weather Endpoints

- Current Weather: GET `/api/weather/current?city={cityName}`
- Weather Forecast: GET `/api/weather/forecast?city={cityName}&days=7`
- City Search: GET `/api/weather/search?q={query}`

Authentication tokens are stored in Local Storage and sent with protected API requests using the Authorization Bearer token.

## How to Run

1. Download or clone the project.
2. Open the project folder in VS Code.
3. Open `index.html` using Live Server.
4. Sign up or log in to access the weather dashboard.
5. Search for a city to view weather information.

## Project Structure

```text
weather-website/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── required assets

Author..
Muskan Gupta