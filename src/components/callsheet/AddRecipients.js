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
  }

  render = () => {
    return <div>
      <h1>This is my add recipients module!</h1>
      {this.props.allUsers.map((user, index) => {
        return <div key={index}>
          <Recipient callsheetDate={this.props.callsheetDate} addUser={this.addUser} user={user}/>
        </div>
      })}
      <h1>CONFIRMED RECIPIENTS:</h1>
      {this.state.recipients[0] ? this.state.recipients.map((user, index) => {
        return <div key={index}>{user.user.name} -
          Call Time: {user.specCallTime}
          Location: {user.specLocation}</div>
      }) : null}
      <button onClick={this.confirmRecipients}>Confirm Recipients</button>
    </div>
  }
}



export default AddRecipients;
