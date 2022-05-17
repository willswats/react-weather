# React Weather <!-- omit in toc -->

A weather application built with React.

## Table of Contents <!-- omit in toc -->

- [General Information](#general-information)
- [Features](#features)
- [Setup](#setup)
- [Acknowledgements](#acknowledgements)

## General Information

The project uses OpenWeather's One Call 1.0 API to fetch the data. I built this project to further my understanding of interacting with API's, and I now have a better understanding of `fetch`, `async`, `await`, and Promises.

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

## Acknowledgements

The svg icons are from [Remix Icon](https://github.com/Remix-Design/remixicon) and [feather](https://github.com/feathericons/feather).
