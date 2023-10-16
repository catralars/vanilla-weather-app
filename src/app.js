let apiKey = "b29fbb7204d51ccd97bdcec9a167f38c";
let units = "metric";
let city = "santiago";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

console.log(apiUrl);