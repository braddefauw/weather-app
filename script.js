// Open Weather Map API example
// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=fc0c7dcaadfcedd322c65a4761888bed

//API mains: thunderstorm, drizzle, rain, snow, clear, clouds, other

console.log("hello weather app!");

//variables to grab for dynamic weather inputs
let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let main = document.querySelector(".main-desc");
let desc = document.querySelector(".additional-desc");
let feelsLke = document.querySelector("#feels-like");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let minTemp = document.querySelector("#min-temp");
let maxTemp = document.querySelector("#max-temp");
let iconImg = document.querySelector("#icon-img");

let locInput = document.getElementById("location");
let submitBtn = document.getElementById("submit");

window.onload = async function(){
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=fc0c7dcaadfcedd322c65a4761888bed`,
        {
            mode: 'cors',
        }
    );
    const weatherData = await response.json();
    // console.log(weatherData);
    const newData = processData(weatherData);
    displayData(newData);
}

submitBtn.addEventListener("click", getWeather)

async function getWeather(e) {
    e.preventDefault();
    const searchText = locInput.value;
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&APPID=fc0c7dcaadfcedd322c65a4761888bed`,
        {
            mode: 'cors',
        }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    const newData = processData(weatherData);
    displayData(newData);
    reset();
}

function processData(weatherData){
    // console.log(weatherData);
    let city = weatherData.name;
    let country = weatherData.sys.country;
    let kelvin = weatherData.main.temp;
    let fahrenheit = Math.round((kelvin - 273.15) * 9/5 +32);
    let celsius = Math.round(kelvin - 273.15);
    let mainWeather = weatherData.weather[0].main;
    let description = weatherData.weather[0].description;
    let feelsLike = weatherData.main.feels_like;
    let feelsLikeF = Math.round((feelsLike - 273.15) * 9/5 +32);
    let feelsLikeC = Math.round(feelsLike - 273.15);
    let humidity = weatherData.main.humidity;
    let pressure = weatherData.main.pressure;
    let lowTemp = weatherData.main.temp_min;
    let lowTempF = Math.round((lowTemp - 273.15) * 9/5 +32);
    let lowTempC = Math.round(lowTemp - 273.15);
    let highTemp = weatherData.main.temp_max;
    let highTempF = Math.round((highTemp - 273.15) * 9/5 +32);
    let highTempC = Math.round(highTemp - 273.15);
    let icon = weatherData.weather[0].icon;
    let selectWeatherData = {city, country, fahrenheit, celsius, mainWeather, description, feelsLike, feelsLikeC, feelsLikeF, humidity, 
        pressure, lowTemp, lowTempC, lowTempF, highTemp, highTempC, highTempF, icon};
    return selectWeatherData;
}

function displayData(newData){
    temp.innerText = `${newData.fahrenheit}° F`
    city.innerText = `${newData.city}, ${newData.country}`;
    main.innerText = newData.mainWeather;
    desc.innerText = newData.description;
    feelsLke.innerText = `${newData.feelsLikeF}° F`;
    humidity.innerText = newData.humidity;
    pressure.innerText = newData.pressure;
    minTemp.innerText = `${newData.lowTempF}° F`
    maxTemp.innerText = `${newData.highTempF}° F`;
    iconImg.src = `http://openweathermap.org/img/wn/${newData.icon}@2x.png`
    if(newData.mainWeather === "Clouds"){
        document.body.style.backgroundImage = "url(images/backgrounds/clouds.webp)"
    }else if(newData.mainWeather === "Thunderstorm"){
        document.body.style.backgroundImage = "url(images/backgrounds/thunderstorms.jpeg)"
    }else if(newData.mainWeather === "Drizzle" || newData.mainWeather === "Rain"){
        document.body.style.backgroundImage = "url(images/backgrounds/rain.webp)"
    }else if(newData.mainWeather === "Snow"){
        document.body.style.backgroundImage = "url(images/backgrounds/snow.jpeg)"
    }else if(newData.mainWeather === "Clear"){
        document.body.style.backgroundImage = "url(images/backgrounds/sun.jpeg)"
    }else{
        document.body.style.backgroundImage = "url(images/backgrounds/weather.webp)"
    }
}

function reset(){
    locInput.value = "";
}