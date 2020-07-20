import React from 'react';
import AddRecipients from './AddRecipients'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import axios from 'axios';

class NewCallsheetForm extends React.Component {
  state = {
    addRecipients: false,
    allCalled: []
  }

  addRecipientsToAllCalled = (arr) => {
    this.setState({
      allCalled: arr
    })
  }

  composeCallsheet = (e) => {
    e.preventDefault();
    this.props.toggleSubmitted();
    // console.log(process.env.REACT_APP_WEATHER_API_KEY_NAME);
    axios.get('https://api.weatherapi.com/v1/forecast.json?key=' + process.env.REACT_APP_WEATHER_API_KEY_NAME + '&q=' + this.state.zipcode + '&days=2').then(
      (response) => {
      // console.log(response.data.forecast.forecastday[1]);
      let weatherObject = {
        max: response.data.forecast.forecastday[1].day.maxtemp_f,
        min: response.data.forecast.forecastday[1].day.mintemp_f,
        rainChance: response.data.forecast.forecastday[1].day.daily_chance_of_rain,
        weatherText: response.data.forecast.forecastday[1].day.condition.text,
        sunrise: response.data.forecast.forecastday[1].astro.sunrise,
        sunset: response.data.forecast.forecastday[1].astro.sunset
      }
      let callsheetObject = {
        projectTitle: this.state.projectTitle,
        date: this.state.date,
        generalCallTime: this.state.crewCallTime,
        generalLocation: this.state.crewLocation,
        allCalled: this.state.allCalled,
        weather: weatherObject
      }
      // console.log(callsheetObject);
      this.props.createCallsheet(callsheetObject);
      this.setState({allCalled:[]})
    })
  }

  confirmRecipients = (arr) => {
    this.setState({
      allCalled:arr
    }, () => {
      this.toggleAddRecipients();
    })
  }

  handleInput = (e) => {
    const attributeId = e.target.getAttribute('id');
    switch (attributeId) {
      case attributeId:
        this.setState({[attributeId]:e.target.value})
        break;
      default:
        break;
    }
  }

  toggleAddRecipients = (e) => {
    if(e){
      e.preventDefault()
    }
    this.setState({addRecipients:!this.state.addRecipients})
  }

  render = () => {
    return <div className="callsheet-form">
      <form onSubmit={this.composeCallsheet}>
        <label>Project Name: </label>
        <input
          onKeyUp={this.handleInput}
          required
          id="projectTitle"
          type="text"
          placeholder="project title"/>
        <br/>
        <label>Date: </label>
        <input
          onKeyUp={this.handleInput}
          required
          id="date"
          type="text"
          placeholder="date"/>
        <br/>
        <label>Crew Calltime: </label>
        <input
          onKeyUp={this.handleInput}
          required
          id="crewCallTime"
          type="text"
          placeholder="crew call time"/>
        <br/>
        <label>Crew Location: </label>
        <input
          onKeyUp={this.handleInput}
          required
          id="crewLocation"
          type="text"
          placeholder="crew location"/>
        <br/>
        <label>Zip Code: </label>
        <input
          onKeyUp={this.handleInput}
          id="zipcode"
          type="text"
          required
          placeholder="zip code"/>
        <br/>
        <button id="add-recipients-button" onClick={this.toggleAddRecipients}>Add Recipients</button>
        <input id="callsheet-submit" type="submit" value="Submit Callsheet"/>
        {this.state.allCalled[0] ? this.state.allCalled.map((user, index) => {
          return <div key={index}>{user.user.name}</div>
        }): <div>No one added yet</div>}
        {this.state.addRecipients ?
          <Modal
          show={this.state.addRecipients}
          onHide={this.toggleAddRecipients}
          size="lg"
          dialogClassName="signup-modal">
            <ModalBody>
              <AddRecipients
                callsheetDate={this.state.date}
                addRecipientsToAllCalled={this.addRecipientsToAllCalled}
                allUsers={this.props.allUsers}
                confirmRecipients={this.confirmRecipients}
                crewCallTime={this.state.crewCallTime?this.state.crewCallTime:''}
                crewLocation={this.state.crewLocation?this.state.crewLocation:''}/>
            </ModalBody>
          </Modal>
          : null
        }
      </form>
    </div>
  }
}

export default NewCallsheetForm
