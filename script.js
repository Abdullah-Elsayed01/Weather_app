const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const date = new Date();
let month = months[date.getMonth()];
let day = date.getUTCDate();
let year = date.getFullYear();
let todayDate = `${month} ${day}, ${year}`;
let city = 'Jeddah';
const dateInput = document.querySelector('.date-output');
const enter = document.addEventListener('keydown', (e) => e.key == 'Enter' ? getCity(): '')
dateInput.innerHTML = todayDate;

const searchIcon = document.querySelector('.search-bar').children[1];
const weatherInfo = document.querySelector('.weather-info');
const errorMessageDiv = document.querySelector('.error-message');
const minMax = document.querySelector('.min-max');
const weatherImg = document.querySelector('.weather-img');
const mainTemp = document.querySelector('.main-temp');
const cityLocation = document.querySelector('.location');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');

const enterKey = (key) => {
  if (key === 'Enter') {
    getCity()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCity(city);
});

console.log(searchIcon)
const getCity = () => {
  const searchCityValue = document.querySelector('#searchBar').value;
  if (searchCityValue) {
    city = searchCityValue;
    errorMessage(false);
    fetchCity(city)
  } else {
    errorMessage(true);
    return;
  }
  searchCityValue = ' ';
}

const fetchCity = async (city) => {
  try {
    const weatherData = await getData(city);
    cityLocation.textContent = weatherData.name; 
    mainTemp.textContent = `${Math.trunc(weatherData.main.temp - 273.15)}°C`;
    minTemp.innerHTML = `<div class="min-temp"><span>min:</span>${Math.trunc(weatherData.main.temp_min - 273.15)}°C</div>`;
    maxTemp.innerHTML = `<div class="max-temp"><span>max:</span>${Math.trunc(weatherData.main.temp_max - 273.15)}°C</div>`;
    const iconCode = weatherData.weather[0].icon;
    weatherImg.innerHTML = `<img src=http://openweathermap.org/img/wn/${iconCode}@2x.png alt="Weather icon"></img>`;
  } catch (error) {
    errorMessage(true);
    console.error(error, "Ops...");
  }
}

const getData = async (city) => {
  const apiKey = 'c68efedb894082f643565dd4450d7787';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    errorMessage(true);
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

const errorMessage = (message) => {
  if (message) {
    weatherInfo.style.display = 'none';
    minMax.style.display = 'none';
    errorMessageDiv.style.display = 'block';
  } else {
    weatherInfo.style.display = 'flex';
    minMax.style.display = 'flex';
    errorMessageDiv.style.display = 'none';
  }
}


// searchIcon.addEventListener(onclick || )