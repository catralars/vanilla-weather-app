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
  
}


function search(city) {
    let apiKey = "3f6be1c407b0d9d1933561808db358ba";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}



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