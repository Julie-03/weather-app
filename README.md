The Weather App is a lightweight application that retrieves real-time weather data using the OpenWeatherMap API. To run it locally, simply clone the repository, install the necessary dependencies with npm install, and add your API key to a .env file using REACT_APP_OPENWEATHER_API_KEY=your_key. Once set up, start the app with npm start.

For deployment on platforms like Heroku or AWS, connect your repository and configure the required environment variables accordingly.

During development, some challenges arose, such as API rate limits, which were addressed by implementing caching, and geolocation errors, which were handled by providing a manual search fallback.

Special thanks to OpenWeatherMap for the weather data and MDN for the geolocation documentation. The project is open-source and licensed under MIT.
