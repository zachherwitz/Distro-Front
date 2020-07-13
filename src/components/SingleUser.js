import React from 'react';
import axios from 'axios';

class SingleUser extends React.Component {
  deleteUser = () => {
    let userId = this.props.displayUser._id;
    axios.delete('http://localhost:3000/users/' + userId).then((response) => {
      this.props.refreshUserList()
      this.props.clearDisplayedUser()
      console.log(response);
    })
  }

  render = () => {
    return <div style={{padding: '20px', border: '2px dotted grey', background: 'thistle'}}>
      <h1>This is my SINGLEUSER component</h1>
      <h2>{this.props.displayUser.name}</h2>
      <div>
        <h4>CALL: {this.props.displayUser.callsheet.callTime}</h4>
        <h4>REPORT TO {this.props.displayUser.callsheet.location}</h4>
        <ul>DEV:: Crew Information:
          <li>Department: {this.props.displayUser.department}</li>
          <li>Email: {this.props.displayUser.email}</li>
          <li>Phone: {this.props.displayUser.phone}</li>
          <ul>
            {this.props.displayUser.distros.map((distro) => {
              return <li>{distro}</li>
            })}
          </ul>
        </ul>
      <button onClick={this.deleteUser}>Delete User</button>
      </div>
    </div>
  }
}

export default SingleUser
