const request = require("request-promise");
const moment = require("moment");
const momentTz = require("moment-timezone");
const zipToTimezone = require("zipcode-to-timezone");
const cityToTimezone = require("city-timezones");


export async function getWeather(getParam, type) {
  let uriString;

  if (type == 'zip') {
  	uriString = `https://api.openweathermap.org/data/2.5/weather?zip=${getParam},us&appid=1c79dc1a6dd0f7c875fabb73750e9999`
  }
  else if (type == 'location') {
  	uriString = `https://api.openweathermap.org/data/2.5/weather?q=${getParam},us&appid=1c79dc1a6dd0f7c875fabb73750e9999`
  }
  else {
  	// return error
  }

  var request_options = {
    uri: uriString,
    method: "GET",
    json: true
  }
  return request(request_options);
}


export function getTime(param, type) {

  let time,
  	  timezone,
  	  d = moment(new Date());

  if (type == 'zip') {
  	timezone = zipToTimezone.lookup(param);
  }
  else if (type == 'location') {
  	let timezones = cityToTimezone.lookupViaCity(param);

  	if (timezones.length > 0) {
  		let timezoneObj = {};
  		if (timezones.length > 1) {
		  	timezoneObj = timezones.find(tz => {
			  return tz.iso3 == 'USA';
			});

	  		if (typeof timezoneObj === "undefined") {
  				timezoneObj = timezones[0];
	  		}
  		}
  		else {
  			timezoneObj = timezones[0];
  		}
  		timezone = timezoneObj.timezone;
  	}
  	else {
		return "Error: Unable to obtain time";
  		// return error, can't get timezone
  	}
  }
  else {
	return "Error: Incorrect type parameter";
  	// return error, incorrect type
  }

  time = d.tz(timezone).format('h:ma z');
  return time;
}
