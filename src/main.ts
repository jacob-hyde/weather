import {getWeather, getTime} from './API';

const weatherData = [{name: 'Rohnert Park', postal_code: 94927}, {name: 'San Francisco', postal_code: 94016}, {name: 'New York', postal_code: null}];

function prettify(string)
{
	return string.charAt(0).toUpperCase() + string.slice(1);
}

weatherData.forEach(async function(weather_location){

	let type, getParam;


	if (weather_location.postal_code) {
		getParam = weather_location.postal_code;
		type = 'zip';
	}
	else if (weather_location.name) {
		getParam = weather_location.name;
		type = 'location';
	}
	else {
		console.log("Error: No postal code or name provided");
		return false;
	}


	getWeather(getParam, type)
		.then((weatherResult) => {
			let weather = weatherResult.weather[0].description,
				temperature = 1.8 * (weatherResult.main.temp - 273.15) + 32,
				name = weatherResult.name,
				time = getTime(getParam, type);
			console.log(name, time, prettify(weather), temperature.toFixed(1) + "°F");

		})
		.catch((err) => {
			console.log(err);
		});
});