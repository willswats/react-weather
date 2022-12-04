# React Weather <!-- omit in toc -->

A weather application built with React and the OpenWeather API.

## Table of Contents <!-- omit in toc -->

- [General Information](#general-information)
- [Features](#features)
- [Setup](#setup)
- [Acknowledgements](#acknowledgements)

## General Information

This project uses the One Call 1.0 API from [openweathermap.org](https://openweathermap.org) to fetch data and then display it to the user.

I built this project to further my understanding of API's, furthermore, I now have a better understanding of `fetch`, `async`, `await`, and Promises.

## Features

- Current forecast
- Hourly forecast
- Daily forecast
- Current weather
- Current alerts
- Choice of metric or imperial
- Use current location
- Search for locations
- Reload data without reloading the page
- Time is synced with the location
- Error handling

## Setup

1. Run `npm install`.
2. Generate an API key from [openweathermap.org](https://openweathermap.org).
3. Create a `.env.local` file and insert the API key into the `.env.local` file, with the key as `VITE_OPEN_WEATHER_API_KEY=`.
4. Run `npm start`.

## Acknowledgements

The SVG icons are from [Remix Icon](https://github.com/Remix-Design/remixicon) and [feather](https://github.com/feathericons/feather).

The architecture is similar to [bulletproof-react](https://github.com/alan2207/bulletproof-react).
