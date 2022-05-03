# React Weather <!-- omit in toc -->

A weather application built with React.

## Table of Contents <!-- omit in toc -->

- [General Information](#general-information)
- [Features](#features)
- [Setup](#setup)

## General Information

I built this project to further my understanding of interacing with API's. Through building this I have learnt more about `fetch`, `async`, `await`, and Promises. The main state of the application is all inside of React's `useEffect` hook.

## Features

- Current forecast
- Hourly forecast
- Daily forecast
- Choice of celcius or fahrenheit
- Use current location
- Search for locations
- Reload data without reloading the page
- Displays the location's time
- Error handling

## Setup

1. Run `npm install`
2. Create a `.env.local` file
3. Generate an API key from [openweathermap.org](https://openweathermap.org).
4. Insert the API key into the `.env.local` file, with the key as `REACT_APP_WEATHER_API_KEY=`.
5. Run `npm start`
