import React, { Component } from 'react';
import './App.css';
import WeatherCard from './components/weather-card';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Weather Man</h1>
        <WeatherCard />
      </div>
    );
  }
}

export default App;
