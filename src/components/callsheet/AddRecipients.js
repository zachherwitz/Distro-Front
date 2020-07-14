import React from 'react';
import Recipient from './Recipient'

let allRecipientsArray = [];

class AddRecipients extends React.Component {
  addUser = (obj) => {
    console.log(obj);
  }

  render = () => {
    return <div>
      <h1>This is my add recipients module!</h1>
      {this.props.allUsers.map((user, index) => {
        return <div key={index}>
          <Recipient addUser={this.addUser} user={user}/>
        </div>
      })}
      <button>Confirm Recipients</button>
    </div>
  }
}



export default AddRecipients;
