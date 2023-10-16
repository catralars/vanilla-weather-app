function displayTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");


  tempElement.innerHTML = Math.round
  (response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "3f6be1c407b0d9d1933561808db358ba";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=santiago&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
