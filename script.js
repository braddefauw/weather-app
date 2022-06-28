// Open Weather Map API example
// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=fc0c7dcaadfcedd322c65a4761888bed

console.log("hello weather app!");

let locInput = document.getElementById("location");
let submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", getWeather)

async function getWeather() {
    const searchText = locInput.value;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchText}&APPID=fc0c7dcaadfcedd322c65a4761888bed`);
    const weatherData = await response.json();
    console.log(weatherData);
    let kelvin = weatherData.main.temp;
    let fahrenheit = Math.round((kelvin - 273.15) * 9/5 +32);
    let celsius = Math.round(kelvin - 273.15);
    let mainWeather = weatherData.weather[0].main;
    let description = weatherData.weather[0].description;
    console.log(fahrenheit, celsius, mainWeather, description);
}