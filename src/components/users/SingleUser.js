import React from 'react';
import UpdateUserForm from './UpdateUserForm'
import axios from 'axios';

class SingleUser extends React.Component {
  state = {
    formShow: false
  }

  deleteUser = () => {
    let userId = this.props.displayUser._id;
    axios.delete('https://distro-app-api.herokuapp.com/users/' + userId).then((response) => {
      this.props.refreshUserList()
      this.props.clearDisplayedUser()
      console.log(response);
    })
  }

  toggleEditForm = () => {
    this.setState({formShow:!this.state.formShow})
  }

  render = () => {
    return <div>
      <h2>{this.props.displayUser.name}</h2>
      <div>
        <h4>CALL: {this.props.displayUser.callsheet.callTime}</h4>
        <h4>REPORT TO {this.props.displayUser.callsheet.location}</h4>
        <ul>DEV:: Crew Information:
          <li>Department: {this.props.displayUser.department}</li>
          <li>Title: {this.props.displayUser.title}</li>
          <li>Email: {this.props.displayUser.email}</li>
          <li>Phone: {this.props.displayUser.phone}</li>
          <li>Role: {this.props.displayUser.role}</li>
          <ul>
            {this.props.displayUser.distros.map((distro) => {
              return <li>{distro}</li>
            })}
          </ul>
        </ul>
      <button onClick={this.deleteUser}>Delete User</button>
      <button onClick={this.toggleEditForm}>Edit User</button>
      {this.state.formShow ? <UpdateUserForm displayUser={this.props.displayUser} refreshSingleUser={this.props.refreshSingleUser}/> : null}
      </div>
    </div>
  }
}

export default SingleUser
