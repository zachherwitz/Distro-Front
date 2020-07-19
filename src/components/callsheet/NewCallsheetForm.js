import React from 'react';
import AddRecipients from './AddRecipients'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

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
    let callsheetObject = {
      date: this.state.date,
      episode: this.state.episode,
      day: this.state.day,
      scriptDraft: this.state.scriptDraft,
      generalCallTime: this.state.crewCallTime,
      generalLocation: this.state.crewLocation,
      nearestHospital: this.state.hospital,
      allCalled: this.state.allCalled
    }
    this.props.createCallsheet(callsheetObject);
  }

  confirmRecipients = (arr) => {
    this.setState({
      allCalled:arr
    }, () => {
      this.toggleAddRecipients();
    })
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

  toggleAddRecipients = (e) => {
    if(e){
      e.preventDefault()
    }
    this.setState({addRecipients:!this.state.addRecipients})
  }

  render = () => {
    return <div className="callsheet-form">
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
        <button onClick={this.toggleAddRecipients}>Add Recipients</button>
        <input type="submit" value="Submit Callsheet"/>
        {this.state.allCalled[0] ? this.state.allCalled.map((user, index) => {
          return <div key={index}>{user.user.name}</div>
        }): <div>No one added yet</div>}
        {this.state.addRecipients ?
          <Modal show={this.state.addRecipients} onHide={this.toggleAddRecipients}>
            <ModalHeader>
              <ModalTitle>Modal</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <AddRecipients
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
