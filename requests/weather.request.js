const rp = require("request-promise");
const config = require("../config");

module.exports = async function (city = "") {
  if (!city) {
    throw new Error("Название города не может быть пустым");
  }

  const APIkey = config.WEATHER_API_KEY;
  const uri = "http://api.openweathermap.org/data/2.5/weather";

  const options = {
    uri,
    qs: {
      appid: APIkey,
      q: city,
      units: "imperial",
    },
    json: true,
  };

  try {
    const data = await rp(options);
    const celsiusTemp = ((data.main.temp - 32) * 5) / 9;

    return {
      weather: `${data.name}: ${celsiusTemp.toFixed(0)}`,
      error: null,
    };
  } catch (error) {
    return {
      weather: null,
      error: error.error.message,
    };
  }
};
