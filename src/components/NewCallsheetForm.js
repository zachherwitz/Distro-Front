import React from 'react';
import AllUsers from './AllUsers'

class NewCallsheetForm extends React.Component {
  state = {

  }

  composeCallsheet = (e) => {
    e.preventDefault();
    let allCalledArray = this.state.allCalled.split(',')
    let callsheetObject = {
      date: this.state.date,
      episode: this.state.episode,
      day: this.state.day,
      scriptDraft: this.state.scriptDraft,
      generalCallTime: this.state.crewCallTime,
      generalLocation: this.state.crewLocation,
      nearestHospital: this.state.hospital,
      allCalled: allCalledArray
    }
    this.props.createCallsheet(callsheetObject);
  }

  newInput = (e) => {
    const attributeId = e.target.getAttribute('id');
    switch (attributeId) {
      case 'date':
        this.setState({[attributeId]:e.target.value})
        break;
      case 'episode':
        this.setState({[attributeId]:e.target.value})
        break;
      case 'day':
        this.setState({[attributeId]:e.target.value})
        break;
      case 'scriptDraft':
        this.setState({[attributeId]:e.target.value})
        break;
      case 'crewCallTime':
        this.setState({[attributeId]:e.target.value})
        break;
      case 'crewLocation':
        this.setState({[attributeId]:e.target.value})
        break;
      case 'hospital':
        this.setState({[attributeId]:e.target.value})
        break;
      case 'allCalled':
        this.setState({[attributeId]:e.target.value})
        break;
      default:
        break;
    }
  }

  render = () => {
    return <div style={{display:'flex'}}>
      <form onSubmit={this.composeCallsheet}>
        <input
          onKeyUp={this.newInput}
          id="date"
          type="text"
          placeholder="date"/>
        <br/>
        <input
          onKeyUp={this.newInput}
          id="episode"
          type="text"
          placeholder="episode"/>
        <br/>
        <input
          onKeyUp={this.newInput}
          id="day"
          type="text"
          placeholder="day"/>
        <br/>
        <input
          onKeyUp={this.newInput}
          id="scriptDraft"
          type="text"
          placeholder="script draft"/>
        <br/>
        <input
          onKeyUp={this.newInput}
          id="crewCallTime"
          type="text"
          placeholder="crew call time"/>
        <br/>
        <input
          onKeyUp={this.newInput}
          id="crewLocation"
          type="text"
          placeholder="crew location"/>
        <br/>
        <input
          onKeyUp={this.newInput}
          id="hospital"
          type="text"
          placeholder="nearest hopsital"/>
        <br/>
        <input
          onKeyUp={this.newInput}
          id="allCalled"
          type="text"
          placeholder="allCalled"/>
        <br/>
        <input type="submit" value="Submit Callsheet"/>
      </form>
      <AllUsers
        allUsers={this.props.allUsers}
        displayUserProfile={this.props.displayUserProfile}/>
    </div>
  }
}

export default NewCallsheetForm
