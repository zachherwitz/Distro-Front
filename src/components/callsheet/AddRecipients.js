import React from 'react';
import Recipient from './Recipient'

let allRecipientsArray = [];

class AddRecipients extends React.Component {
  state = {
    recipients: []
  }

  addUser = (obj) => {
    if(obj.specCallTime === ''){
      obj.specCallTime = this.props.crewCallTime
    }
    if(obj.specLocation === ''){
      obj.specLocation = this.props.crewLocation
    }
    allRecipientsArray.push(obj)
    this.setState({
      recipients:allRecipientsArray
    })
  }

  confirmRecipients = () => {
    let recipients = this.state.recipients;
    this.props.confirmRecipients(recipients);
    this.setState({recipients:[]})
    allRecipientsArray = [];
  }

  render = () => {
    return <div className="add-recipients">
      <div className="add-recipients-title">Add recipients to the callsheet!</div>
      <div className="add-recipients-text">Click the plus button next to the user's name to adjust their specific call time and location.</div>
      <hr></hr>
      {this.props.allUsers.map((user, index) => {
        return <div key={index}>
          <Recipient callsheetDate={this.props.callsheetDate} addUser={this.addUser} user={user}/>
        </div>
      })}
      <hr></hr>
      <div className="add-recipients-text">Confirmed Recipients:</div>
      {this.state.recipients[0] ? this.state.recipients.map((user, index) => {
        return <div key={index}>{user.user.name} -
          Call Time: {user.specCallTime + "  "}
          Location: {user.specLocation}</div>
      }) : null}
      <button id="confirm-recipients-button" onClick={this.confirmRecipients}>Confirm Recipients</button>
    </div>
  }
}



export default AddRecipients;
