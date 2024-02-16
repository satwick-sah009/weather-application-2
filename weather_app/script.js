const apikey = "2e7d30b81655ab160dddedc838594222";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apikey + "&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

let latitude, longitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const apiurl1 = "http://api.openweathermap.org/geo/1.0/reverse&appid=" + apikey +"?lat=" + latitude + "&lon=" + longitude;
  
  // For demonstration purposes, you can log the values
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

async function checkweather(city) {

    if (city.trim() === "") {
        console.log("City name is required.");
        return;
    }

    try {
        const response = await fetch(apiurl + city);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";

        if(data.weather[0].main == "Clouds"){
            weathericon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weathericon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weathericon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weathericon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weathericon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display="block";



    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

getLocation()



searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});

searchbox.addEventListener("keydown", (event) => {
    
    if (event.key === "Enter") {
        checkweather(searchbox.value);
    }}
)

