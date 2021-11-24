import React from 'react';

import api from './api';

// цель: связать api с react для того чтобы можно было отобразить данные про погоду
// алгоритм:
//   1. заэкспортить api в корень проекта
//   2. создать inputы для ввода динамических данных, которые будут заходить в state
//   3. из statа данные будут заходить в асинхронную функцию как аргументы api
//   4. результат (в виде объекта), который вернёт api, вывести в консоль в браузере чтобы посмотреть из чего он состоит
//   5. по ключам достучаться к нужным данным объекта и определить их в разметке

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      currentTemperature: '',
      days: 3,
      forecast: null,
      search: null
    }
  }

  handleChangeInputValue = (e) => {
    this.setState({ query: e.target.value })
  }

  handleKeyUp = async (e) => {
    this.setState({ query: e.target.value })
    const search = await api.search({ q: this.state.query })
    this.setState({ search })
    console.log(search);
  }

  handleClickSearch = async () => {
    const forecast = await api.forecast({ q: this.state.query, days: this.state.days });

    this.setState({ forecast })
    if (forecast) {
      console.log(forecast.forecast.forecastday);
    }
    const search = await api.search({ q: this.state.query })
    console.log(search);
    const array = search.map((result) => {
      return console.log(result);
    })
  }

  getFullName = (name) => {
    switch (name) {
      case 'Sun':
        return 'Sunday';
        break;
      case 'Mon':
        return 'Monday';
        break;
      case 'Tue':
        return 'Tuesday';
        break;
      case 'Wed':
        return 'Wednesday';
        break;
      case 'Thu':
        return 'Thursday';
        break;
      case 'Fri':
        return 'Friday';
        break;
      case 'Sat':
        return 'Saturday';
        break;
    }
  }

  renderDatalist = async () => {
    const { search } = this.state;
    if (!search) return;
    return (
      <datalist id="search">
        {search.map((res) => {
          return (
            <option value={res.name} key={id} />
            // console.log(res)
          )
        })}
      </datalist>
    )
  }

  renderHeader = () => {
    return (
      <div className="header">
        <div className="icon">
          <img src="https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-2.png"/>
        </div>
        <form>
          <input
            type="text"
            id="search"
            value={this.state.query}
            onChange={this.handleChangeInputValue}
            onKeyUp={this.handleKeyUp}
          />
          {this.renderDatalist()}
          {/* {this.state.search
            ? (
                <datalist id="search">
                  {this.state.search.map((res) => {
                    return (
                      // <option value={res.name} />
                      console.log(res)
                    )
                  })}
                </datalist>
            )
            : ''
          } */}
        </form>
        <button className="search" onClick={this.handleClickSearch}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    )
  }

  renderCurrentWeather = () => {
    const { forecast } = this.state;
    if (!forecast) return;

    return (
      <div className="current-weather">
        <div className="location">
          {forecast.location.name}, {forecast.location.region}
        </div>
        <div className="current-temperature">
          <span>{Math.round(forecast.current.temp_c)}</span>
          <nobr>°</nobr>
          <span className="feels-like">
            (feels like {Math.round(forecast.current.feelslike_c)}<nobr>°</nobr>)
          </span>
        </div>
        <div className="condition">
          <img src={`http:${forecast.current.condition.icon}`} />
          <span>{forecast.current.condition.text}</span>
        </div>
        <div className="highest-lowest-temp">
          <div>
            <span>Highest: {Math.round(forecast.forecast.forecastday[0].day.maxtemp_c)}</span>
            <nobr>°,</nobr>
          </div>
          <div>
            <span>Lowest: {Math.round(forecast.forecast.forecastday[0].day.mintemp_c)}</span>
            <nobr>°</nobr>
          </div>
        </div>
        <div className="min-max-temp"></div>
      </div>
    )
  }

  renderForecastFor24Hours = () => {
    const { forecast } = this.state;
    if (!forecast) return;

    const date = forecast.current.last_updated;
    const time = date.split(' ');
    const currentHour = time[1].split(':')[0];
    const nextHour = Number(currentHour) + 1 ;
    const today = forecast.forecast.forecastday[0];
    const tomorrow = forecast.forecast.forecastday[1];

    return (
      <div className="twenty-four-hours-forecast">
        {today.hour.map((hr, i) => {
          if (i <= currentHour) {
            return;
          } else {
            return (
              <div className="hour" key={i}>
                <div>{hr.time.split(' ')[1].split(':')[0]}:00</div>
                <img src={`http:${hr.condition.icon}`} />
                <div>{Math.round(hr.temp_c)}<nobr>°</nobr></div>
              </div>
            )
          }
        })}
        {tomorrow.hour.map((hr, i) => {
          if (i > currentHour) {
            return;
          } else {
            return (
              <div className="hour" key={i}>
                <div>{hr.time.split(' ')[1].split(':')[0]}:00</div>
                <img src={`http:${hr.condition.icon}`} />
                <div>{Math.round(hr.temp_c)}<nobr>°</nobr></div>
              </div>
            )
          }
        })}
      </div>
    )
  }

  renderForecast = () => {
    const { forecast } = this.state;
    if (!forecast) return;

    return (
      <div className="forecast">
        {forecast.forecast.forecastday.map((day, di) => {
          if (di === 0) {
            return;
          } else {
            let dayOfWeek = String(new Date(day.date_epoch*1000)).split(' ')[0];

            return (
              <div className="day" key={`day-${di}`}>
                <div className="day-of-week">{this.getFullName(dayOfWeek)}</div>
                <img src={`http:${day.day.condition.icon}`} />
                <div className="temp">
                  <span>{Math.round(day.day.maxtemp_c)}<nobr>°</nobr></span>
                  <span>{Math.round(day.day.mintemp_c)}<nobr>°</nobr></span>
                </div>
              </div>
            )
          }
        })}
      </div>
    )
  }

  renderTodayWeatherDetails = () => {
    const { forecast } = this.state;
    if (!forecast) return;
    const today = forecast.forecast.forecastday[0];

    return (
      <div className="weather-details">
        <div className="text">
          It is {today.day.condition.text.toLowerCase()} today. The high will be {Math.round(today.day.maxtemp_c)}<nobr>°</nobr>. The low will be {Math.round(today.day.mintemp_c)}<nobr>°</nobr> at night.
        </div>
        <div>
          <span>Sunrise</span>
          <span>{today.astro.sunrise}</span>
        </div>
        <div>
          <span>Sunset</span>
          <span>{today.astro.sunset}</span>
        </div>
        <div>
          <span>Moonphase</span>
          <span>{today.astro.moon_phase}</span>
        </div>
        <div>
          <span>Chance of rain</span>
          <span>{today.day.daily_chance_of_rain}%</span>
        </div>
        <div>
          <span>Chance of snow</span>
          <span>{today.day.daily_chance_of_snow}%</span>
        </div>
        <div>
          <span>Precipitation</span>
          <span>{today.day.totalprecip_mm} mm</span>
        </div>
        <div>
          <span>UV index</span>
          <span>{today.day.uv}</span>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.state.forecast);

    return (
      <div className="weather-app">
        {this.renderHeader()}
        {this.renderCurrentWeather()}
        {this.renderForecastFor24Hours()}
        {this.renderForecast()}
        {this.renderTodayWeatherDetails()}
      </div>
    );
  }
};
