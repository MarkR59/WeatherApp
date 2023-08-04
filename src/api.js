// Gets city name from form
function getDataFromForm() {
    const input = document.querySelector('.search-box-input');
    const cityName = input.value;
  
    // if not an empty string
    if (cityName) {
      // remove whitespace for the api call
      return cityName
        .replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
        .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
        .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
        .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
    }
    return '';
  }

// Builds request url to obtain response for cityName
function buildRequestUrl(cityName) {
    return `https://api.weatherapi.com/v1/current.json?key=4f293ac0689e4ebf80d190949233107&q=${cityName}`;
}

async function getInfo(url) {
    const response = await fetch(url);
    const weatherData = await response.json();
    const forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4f293ac0689e4ebf80d190949233107&days=3&q=07410}`)
    const forecastData = await forecast.json();

    const name = weatherData.location.name;
    const country = weatherData.location.country;
    const today_temp_c = weatherData.current.temp_c;
    const today_temp_f = weatherData.current.temp_f;
    const today_condition = weatherData.current.condition.text;
    const tmrw_temp_c = forecastData.forecast.forecastday[1].day.avgtemp_c;
    const tmrw_temp_f = forecastData.forecast.forecastday[1].day.avgtemp_f;
    const tmrw_condition = forecastData.forecast.forecastday[1].day.condition.text;
    const day3_temp_c = forecastData.forecast.forecastday[2].day.avgtemp_c;
    const day3_temp_f = forecastData.forecast.forecastday[2].day.avgtemp_f;
    const day3_condition = forecastData.forecast.forecastday[2].day.condition.text;
    const info = {
        name: name,
        country: country,
        today_temp_c: today_temp_c,
        today_temp_f: today_temp_f,
        today_condition: today_condition,
        tmrw_temp_c: tmrw_temp_c,
        tmrw_temp_f: tmrw_temp_f,
        tmrw_condition: tmrw_condition,
        day3_temp_c: day3_temp_c,
        day3_temp_f: day3_temp_f,
        day3_condition: day3_condition,
    }
  
    return info;
  }

export {
    getDataFromForm,
    buildRequestUrl,
    getInfo,
};
