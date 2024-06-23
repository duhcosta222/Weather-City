const apiKey = 'YOUR_API_KEY_HERE';
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorInfo = document.getElementById('errorInfo');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    getWeather(cityName);
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`);
        if (!response.ok) {
            throw new Error('City not found or invalid API key');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError(error.message);
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherInfo.innerHTML = `
        <div class="weather-detail">City: ${name}</div>
        <div class="weather-detail">Temperature: ${main.temp} °C</div>
        <div class="weather-detail">Humidity: ${main.humidity} %</div>
        <div class="weather-detail">Condition: ${weather[0].description}</div>
    `;
    errorInfo.innerHTML = ''; 
}

function displayError(message) {
    errorInfo.innerHTML = `
        <div class="error-message">${message}</div>
    `;
}
