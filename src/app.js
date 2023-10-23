function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}



//days of forecast//
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}


// forecast //
function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
 
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `
      <div class="col-sm-2">
            <div class="forecast-wrapper">
                <div class="weather-forecast-date">
                ${formatDay(forecastDay.time)}
                </div>
                <img 
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png" alt="" 
                class="forecast-weather-icon">
                <div class="forecast-temperature-wrapper">
                    <span class="forecast-max-temp">${Math.round(
                      forecastDay.temperature.maximum
                    )}°</span>
                    <span class="forecast-min-temp">${Math.round(
                      forecastDay.temperature.minimum
                    )}°</span>
                </div>
            </div>
        </div>     
    `;
      }
 })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
}


//API integration for forecast//
function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "0ca61c7b17f8abb0t534930b23eob275";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}



// select and display current weather features through innerHTML //
function displayTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#current-icon");

  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate (response.data.dt * 1000);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
  
}


function search(city) {
    let apiKey = "3f6be1c407b0d9d1933561808db358ba";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}



// by submitting the form it changes the city //
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}



function displayFahrenheitTemp(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    // remove the active class to the celsius link //
    celsiusLink.classList.remove("active");
    // add the active class to fahrenheit link //
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;  
    tempElement.innerHTML = Math.round(fahrenheitTemp);
    
}



function displayCelsiusTemp(event) {
    event.preventDefault();
    // add the active class to the celsius link //
    celsiusLink.classList.add("active");
    // remove the active class to fahrenheit link //
    fahrenheitLink.classList.remove("active");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(celsiusTemp);
}


let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);


search("santiago");

