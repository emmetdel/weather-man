import React, { Component } from 'react';
import './weather-card.css';

class WeatherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      data: null,
      error: null,
    };
  }

  searchCities = e => {
    let inputValue = e.target.value;
    if (inputValue === '' || inputValue === null) {
      this.setState({ error: false, searchInput: inputValue });
      return;
    }
    this.setState({ searchInput: inputValue });
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        } else {
          return response;
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ error: false, data: data });
      })
      .catch(err => this.setState({ error: true, data: null }));
  };

  kelvinToCelcius = temp => {
    return Math.round(temp - 273.15);
  };

  render() {
    return (
      <div>
        <div className="top-card">
          <input
            id="city"
            style={{ border: this.state.error ? 'red solid 3px' : 'none' }}
            label="Search by City..."
            value={this.state.searchInput}
            onChange={this.searchCities}
            margin="normal"
          />
        </div>
        <div>
          {this.state.data !== null ? (
            <div>
              <p>City Name: {this.state.data.name}</p>
              <p>
                Current Temp: {this.kelvinToCelcius(this.state.data.main.temp)}°C
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default WeatherCard;
