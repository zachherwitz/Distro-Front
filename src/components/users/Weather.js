import React from 'react';

class Weather extends React.Component {
  render = () => {
    return <div className="weather-widget">
      <h4>Weather:</h4>
      <h6>{this.props.callsheet.weather[0].weatherText}</h6>
      <h6>Max {this.props.callsheet.weather[0].max}</h6>
      <h6>Min {this.props.callsheet.weather[0].min}</h6>
      <h6>Chance of Rain: {this.props.callsheet.weather[0].rainChance}%</h6>
      <h6>Sunrise {this.props.callsheet.weather[0].sunrise}</h6>
      <h6>Sunset {this.props.callsheet.weather[0].sunset}</h6>
    </div>
  }
}

export default Weather
