const API_KEY = process.env.OPENWEATHER_API_KEY; 
let requestCount = 0;

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) getWeather(city);
});

async function getWeather(city) {
    if (!API_KEY) {
        console.error("API key is missing!");
        document.getElementById('weather-result').innerHTML = `
            <div class="weather-error">
                <p>⚠️ Configuration Error: API key not set</p>
            </div>
        `;
        return;
    }

    const weatherDiv = document.getElementById('weather-result');
    weatherDiv.innerHTML = '<div class="weather-placeholder"><p>Loading...</p></div>';
    requestCount++;
    
    try {
        console.log(`--- Request #${requestCount} ---`);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        console.groupCollapsed('Response Headers');
        response.headers.forEach((value, key) => console.log(`${key}: ${value}`));
        console.groupEnd();
        
        const serverHeader = response.headers.get('X-Backend-Server') || "Unknown";
        console.log(`Backend Server: ${serverHeader}`);
        updateServerIndicator(serverHeader);  
        
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            throw new Error(data.message || 'City not found');
        }
    } catch (error) {
        console.error("Request failed:", error);
        weatherDiv.innerHTML = `
            <div class="weather-error">
                <p>⚠️ Error: ${error.message}</p>
                <p>Please try another city</p>
            </div>
        `;
    }
}

function updateServerIndicator(server) {
    const serverIndicator = document.getElementById('server-indicator');
    if (serverIndicator) {
        serverIndicator.innerHTML = `🌍 Server: ${server}`;
    }
}

function displayWeather(data) {
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    
    document.getElementById('weather-result').innerHTML = `
        <div class="weather-info">
            <h2 class="weather-location">${data.name}, ${data.sys.country}</h2>
            <div class="weather-main">
                <span class="weather-icon-large">${weatherIcon}</span>
                <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
            </div>
            <p class="weather-description">${data.weather[0].description}</p>
            <div class="weather-details">
                <div class="weather-detail">
                    <span>💧</span>
                    <span>${data.main.humidity}%</span>
                </div>
                <div class="weather-detail">
                    <span>🌬️</span>
                    <span>${Math.round(data.wind.speed)} m/s</span>
                </div>
                <div class="weather-detail">
                    <span>🌡️</span>
                    <span>${Math.round(data.main.feels_like)}°C</span>
                </div>
            </div>
        </div>
    `;
}


function getWeatherIcon(weatherCondition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Fog': '🌁'
    };
    return icons[weatherCondition] || '🌈';
}



