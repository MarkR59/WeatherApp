import * as apiFncs from './api';
import scribeImg from './Scribe.jpg';
import './style.css';

const searchBox = document.querySelector('.search-box');
const togggleBtn = document.querySelector('.toggleUnit');
const cityText = document.querySelector('.city');
const countryText = document.querySelector('.country');
const todayTemp = document.querySelector('.today > .temp');
const todayCond = document.querySelector('.today > .condition');
const tmrwTemp = document.querySelector('.tomorrow > .temp');
const tmrwCond = document.querySelector('.tomorrow > .condition');
const day3Temp = document.querySelector('.day3 > .temp');
const day3Cond = document.querySelector('.day3 > .condition');
const todayNode = document.querySelector('.today');
const tmrwNode = document.querySelector('.tomorrow');
const day3Node = document.querySelector('.day3');

let unit = 'imperial';

document.addEventListener('DOMContentLoaded', function() {
    getWeatherData(true);
});

// text input to search city
searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      getWeatherData();
    }
});

togggleBtn.addEventListener('click', function(){
    if (unit == 'metric'){
        unit = 'imperial';
    }
    else if (unit == 'imperial'){
        unit = 'metric';
    }
    unitReload = true;
    getWeatherData();
});

let scribe = document.createElement('img');
scribe.src = scribeImg;
scribe.classList.add('scribeImg');
searchBox.appendChild(scribe);


// flags to keep track of last searched city, to re-use this info when changing units
let unitReload = false;
let lastCity = 'auckland';

async function getWeatherData(initialLoad = false) {
    // try to get weather data for the city name that was input into search box
      let cityName;
      // default weather location on initial load
      if (initialLoad) {
        cityName = 'auckland';
      } else {
        // if not initial load, get relevent weather data
        cityName = apiFncs.getDataFromForm();
      }
  
      // if no name entered, exit function
      if (!cityName) {
        return;
      }
  
      // when changing display between metric and imperial units, the data must refresh with a new api call
      // that uses those new units. when the units are changed, unitReload is set to true and then the
      // getWeatherData function is fired. if unitReload is true, then we want to search for the same city
      // as the previous one.
      if (unitReload) {
        cityName = lastCity;
      }
  
      // keep track of the last searched city, so when refreshing the data with changed units
      // the same current city will be searched for.
      lastCity = cityName;
  
      // get info of searched city
      const url = apiFncs.buildRequestUrl(cityName);
      const info = await apiFncs.getInfo(url);
  
      // copy some data over from the coordinates data over to the new data
      renderWeatherData(info, unit);
      
  
      // reset unit reload
      unitReload = false;
};

function renderWeatherData(info, unit){
    if (unit == 'metric'){
        todayTemp.textContent = info.today_temp_c + "°C";
        tmrwTemp.textContent = info.tmrw_temp_c + "°C";
        day3Temp.textContent = info.day3_temp_c + "°C";
    }
    else{
        todayTemp.textContent = info.today_temp_f + "°F";
        tmrwTemp.textContent = info.tmrw_temp_f + "°F";
        day3Temp.textContent = info.day3_temp_f + "°F";
    }
    cityText.textContent = info.name;
    countryText.textContent = info.country;
    todayCond.textContent = info.today_condition;
    tmrwCond.textContent = info.tmrw_condition;
    day3Cond.textContent = info.day3_condition;
}
