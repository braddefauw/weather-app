// Open Weather Map API example
// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=fc0c7dcaadfcedd322c65a4761888bed

console.log("hello weather app!");

let locInput = document.getElementById("location");
let submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", getLocation)

async function getLocation() {
    const searchText = locInput.value;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchText}&APPID=fc0c7dcaadfcedd322c65a4761888bed`);
    const weatherData = await response.json();
    console.log(weatherData);
}