 
let days =["Sunday" , "Monday" , "Tuesday" , "Wednesday","Thursday" ,"Friday" , "Saturday"]


let date = new Date().toLocaleString('en-us', {weekday:'long'})

let index = days.indexOf(date);

let numericDate = new Date().toLocaleString('en-us', {day:"numeric", month:"long"})

let day2 = days[index+1]
let day3 = days[index+2]


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation);
  }

async function getLocation(position){
    const location = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
    const res = await location.json();
    console.log(res.city);
    getWeatherGeo(res.city)
}
async function getWeatherGeo(geoCity){
    const weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3bc584bac3684d91a4c204013230808&q=${geoCity}&days=7`);
    const res = await weather.json();
    // console.log(res);

    display(res,geoCity)
}

start()

async function start(){
const weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3bc584bac3684d91a4c204013230808&q=cairo&days=7`);
const res = await weather.json();
display(res,"cairo")
// console.log(res);
}

async function getWeather(){
    let cityName = document.getElementById("city").value;
    const weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3bc584bac3684d91a4c204013230808&q=${cityName}&days=7`);
    const res = await weather.json();
    // console.log(res);

    display(res,cityName)
}


function display(response , cityName) {
   let weatherTable = document.getElementById("weather-table");
   weatherTable.innerHTML = `
   <div class=" weather col-md-4">
   <div class="header d-flex justify-content-between">
       <div class="day ">${date}</div>
       <div class="date">${numericDate}</div>
   </div>
   <div class="weather-container " id="today-forcast">
       <div id="city-name" class="p-3">${cityName}</div>
       <div id="temp" class="px-3 py-4 d-flex align-items-center justify-content-between">
           <div class="degree d-flex justify-content-center align-items-center">
                <div id="degree">${response.current.temp_c}</div>
               <sup>o</sup>
               C
           </div>
           <div id="icon"><img src="${response.current.condition.icon}" alt=""></div>
       </div>
       <div id="sun-case" class="p-3 text-info">${response.current.condition.text}</div>
       <div class="d-flex justify-content-between p-3 align-items-center div-icons">
           <div class="d-flex justify-content-center align-items-center pe-3">
           <i class="fa-solid fa-umbrella px-2"></i>
               <div>20 %</div>
           </div>
           <div class="d-flex justify-content-center align-items-center pe-3">
           <i class="fa-solid fa-wind px-2"></i>
               <div>${response.current.wind_kph}km/hr</div>
           </div>
           <div class="d-flex justify-content-center align-items-center pe-3">
           <i class="fa-regular fa-compass px-2"></i>
               <div>${response.current.wind_dir}</div>
           </div>
       </div>

   </div>
</div>
<div class="weather2 col-md-4">
   <div class="header2 text-center">
       <div class="day ">${day2}</div>
   </div>
   <div class="weather-container py-4 text-center">
       <div class="py-4"><img src="${response.forecast.forecastday[1].day.condition.icon}" alt=""></div>
       <div class="max-temp py-2 d-flex justify-content-center align-items-center">
           <div id="degree">${response.forecast.forecastday[1].day.maxtemp_c}</div>
          <sup>o</sup>
          C
      </div>
      <div class=" d-flex justify-content-center align-items-center">
           <div id="degree">${response.forecast.forecastday[1].day.mintemp_c}</div>
          <sup>o</sup>
          C
      </div>
      <div class="py-5 text-info">${response.forecast.forecastday[1].day.condition.text}</div>
   </div>
</div>
<div class="weather col-md-4">
   <div class="header text-center">
       <div class="day ">${day3}</div>
   </div>
   <div class="weather-container py-4 text-center">
       <div class="py-4"><img src="${response.forecast.forecastday[2].day.condition.icon}" alt=""></div>
       <div class="max-temp py-2 d-flex justify-content-center align-items-center">
           <div id="degree">${response.forecast.forecastday[2].day.maxtemp_c}</div>
          <sup>o</sup>
          C
      </div>
      <div class=" d-flex justify-content-center align-items-center">
           <div id="degree">${response.forecast.forecastday[2].day.mintemp_c}</div>
          <sup>o</sup>
          C
      </div>
      <div class="py-5 text-info">${response.forecast.forecastday[2].day.condition.text}</div>
   </div>
</div>`
}