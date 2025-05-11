function getFormattedLocation(locationObject) {
  return `${locationObject.name}, ${locationObject.region} - ${locationObject.country}`;
}

function getFormattedDate(currentDate) {
  const date = new Date(currentDate);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

function getFormattedTime(localtime) {
  return localtime.split(" ")[1];
}

function getFormattedImage(weather, format, moment) {
  let imageUrl;
  let timeOfDay = "Day";

  if (moment && typeof moment.is_day !== "undefined") {
    timeOfDay = moment.is_day ? "Day" : "Night";
  }

  imageUrl = `Weather=${weather}, Moment=${timeOfDay}.${format}`;

  return format === "svg"
    ? `./images/icons/${imageUrl}`
    : `./images/backgrounds/${imageUrl}`;
}

function getMaxTemperature(data, isForecast, index) {
  if (isForecast && data.temp_c !== undefined) {
    return `${getCeiledValue(data.temp_c)}°c`;
  } else if (data["temperature_2m_max"] && data["temperature_2m_max"][index] !== undefined) {
    return `${getCeiledValue(data["temperature_2m_max"][index])}°c`;
  }
  return "N/A";
}

function getMinTemperature(forecastObject, index) {
  if (
    forecastObject["temperature_2m_min"] &&
    forecastObject["temperature_2m_min"][index] !== undefined
  ) {
    return `${getCeiledValue(forecastObject["temperature_2m_min"][index])}°c`;
  }
  return "N/A";
}

function getTemperatureRange(maxTemperature, forecastObject, index) {
  return `${getMinTemperature(forecastObject, index)} / ${maxTemperature}`;
}

function getCeiledValue(value) {
  return Math.ceil(value);
}

function getWeatherConditionUsingCode(code) {
  const newIcons = {
    Clear: [1000, 1, 0],
    Rain: [
      1063, 1069, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1237, 1240,
      1243, 1246, 1249, 1252, 1261, 1264, 61, 63, 65, 80, 81, 82,
    ],
    Storm: [1087, 1273, 1276, 1279, 1282, 66, 67, 95, 96, 99],
    Cloudy: [
      1006, 1009, 1030, 1072, 1117, 1135, 1147, 1150, 1153, 1168, 1171, 1204,
      1207, 45, 48, 51, 53, 55, 56, 57,
    ],
    "Few Clouds": [1003, 2, 3],
    Snow: [
      1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 71, 73, 75,
      77, 85, 86,
    ],
  };
  const matchedWeatherCondition = Object.keys(newIcons).find((key) =>
    newIcons[key].includes(code)
  );

  return matchedWeatherCondition || "Unknown";
}

export {
  getFormattedLocation,
  getFormattedDate,
  getFormattedTime,
  getFormattedImage,
  getMaxTemperature,
  getMinTemperature,
  getTemperatureRange,
  getCeiledValue,
  getWeatherConditionUsingCode,
};