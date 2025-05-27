const apiKey = "9cb8a50c2e82def666f80145bc251b97";
const dayName = document.querySelector('.date-dayname');
const dateDay = document.querySelector('.date-day');
const locationName = document.querySelector('.location');
const weatherImg = document.querySelector('.weather-container .weather-img');
const weatherTemp = document.querySelector('.weather-container .weather-temp');
const weatherDesc = document.querySelector('.weather-container .weather-desc');
const precipitation = document.querySelector('.precipitation .value');
const humidity = document.querySelector('.humidity .value');
const wind = document.querySelector('.wind .value');
const weekList = document.querySelectorAll('.week-list li');

function dateFormat(date) {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const month = newDate.toLocaleString('default', { month: 'short' });
    const year = newDate.getFullYear();
    const result = `${day} ${month} ${year}`;
    return result;
}

function getLocation() {
    if (navigator.geolocation) {
        return new Promise((res) => {
            return navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const api = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                res(api);
            })
        })
    }
}

getLocation()
    .then((position) => {
        return position.json();
    })
    .then((data) => {
        const day = new Date(data.list[0].dt_txt).toLocaleString('default', { weekday: 'long' });
        const date = data.list[0].dt_txt; 
        const city = data.city.name.replace(' City', '');
        const country = data.city.country;
        const imgSrc = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
        const favicon = document.querySelector("link[rel~='icon'");
        const temp = Math.round((parseFloat(data.list[0].main.temp)-273.15));
        const desc = data.list[0].weather[0].main;
        const precipitationValue = data.list[0].pop;
        const humidityValue = data.list[0].main.humidity;
        const windValue = data.list[0].wind.speed;


        favicon.href = imgSrc;
        weatherImg.src = imgSrc;
        weatherTemp.innerText = `${temp}°C`;
        weatherDesc.innerText = desc;
        dayName.innerText = day;
        dateDay.innerText = dateFormat(date);
        locationName.innerText = `${city}, ${country}`;
        precipitation.innerText = `${precipitationValue} %`;
        humidity.innerText = `${humidityValue} %`;
        wind.innerText = `${windValue} km/h`;


        let i = 0;
        weekList.forEach(item => {
            const img = item.querySelector('img.weather-img');
            const day = item.querySelector('span.day');
            const temps = item.querySelector('span.day-temp');
            i += 8;
            img.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
            day.innerText = new Date(data.list[i].dt_txt).toLocaleString('default', { weekday: 'short'});
            temps.innerText = Math.round((parseFloat(data.list[i].main.temp)-273.15)) + " °C";
        })
    });
