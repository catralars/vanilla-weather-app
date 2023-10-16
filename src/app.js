function displayTemperature (response) {
    console.log(response);

}

let apiKey = "281450ec88936f4fa8ee9864682b49a0";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=santiago&appid=${apiKey}&units=metric";

axios.get(apiUrl).then(displayTemperature);
