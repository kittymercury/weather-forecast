const currentWeatherInVinn = await api.currentWeather({ q: 'Vinnitsa' });

const forecastVinnForWeek = await api.forecast({ q: 'Vinnitsa', days: '7' });
const forecastVinnToday = forecastVinnForWeek.forecast.forecastday[0];

const todayWeatherDetails = forecastVinnToday.day;

// day: {
//     maxtemp_c: 17.1,
//     mintemp_c: 4.4,
//     maxwind_kph: 16.6,
//     totalprecip_mm: 0,
//     avghumidity: 61,
//     daily_chance_of_rain: 0,
//     daily_chance_of_snow: 0,
//     condition: {
//       text: 'Partly cloudy',
//       icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
//       code: 1003
//     },
//     uv: 3
//   }

// condition
const weatherCondition = todayWeatherDetails.condition;
// condition: {
//       text: 'Partly cloudy',
//       icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
//       code: 1003
//     }


// temperature
const maxTemp = todayWeatherDetails.maxtemp_c;
const minTemp = todayWeatherDetails.mintemp_c;

// astro
const astro = forecastVinnToday.astro;
//   astro: {
//     sunrise: '07:04 AM',
//     sunset: '06:47 PM',
//     moonrise: 'No moonrise',
//     moonset: '04:26 PM',
//     moon_phase: 'Waning Crescent',
//     moon_illumination: '28'
//   }

// divided for hours
const weatherInDetail = forecastVinnToday.hour;
// weatherInDetail[0] - at 00:00
hour: [
    {
      time: '2021-09-30 00:00',
      temp_c: 6.5,
      feelslike_c: 3.7,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
        code: 1003
      }
    },
    {
      time: '2021-09-30 01:00',
      temp_c: 6,
      feelslike_c: 3.4,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
        code: 1003
      }
    }
