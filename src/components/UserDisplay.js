import React from 'react';
import NewUserForm from  './NewUserForm';

class UserDisplay extends React.Component {
  render = () => {
    return <div>
      <NewUserForm refreshUserList={this.props.refreshUserList}/>
      <h1>THIS IS MY VIEW ALL USERS DIV</h1>
      <ul> Users:
        {this.props.allUsers.map((user, index) => {
          return <li key={index} id={index} onClick={this.props.displayUserProfile}>{user.name}</li>
        })}
      </ul>
      {this.props.displayUser ?
      <div style={{padding: '20px', border: '2px dotted grey', background: 'thistle'}}>
        <h1>{this.props.displayUser.name}</h1>
        <h2>Crew Information:</h2>
        <div>
          <h4>{this.props.displayUser.name} CALL: {this.props.displayUser.callsheet.callTime}</h4>
          <h4>REPORT TO {this.props.displayUser.callsheet.location}</h4>
          <ul>DEV:: Crew Information:
            <li>Department: {this.props.displayUser.department}</li>
            <li>Email: {this.props.displayUser.email}</li>
            <li>Phone: {this.props.displayUser.phone}</li>
            <li>
              <ul>
                {this.props.displayUser.distros.map((distro) => {
                  return <li>{distro}</li>
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div> : null}
    </div>
  }
}

export default UserDisplay
