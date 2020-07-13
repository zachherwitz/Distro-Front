import React from 'react';
import AllUsers from './AllUsers'
import NewUserForm from  './NewUserForm';
import SingleUser from './SingleUser'

class UserDisplay extends React.Component {
  render = () => {
    return <div>
      <NewUserForm refreshUserList={this.props.refreshUserList}/>
      <div style={{display: "flex"}}>
        <AllUsers
          allUsers={this.props.allUsers}
          displayUserProfile={this.props.displayUserProfile}/>
        {this.props.displayUser ?
          <SingleUser displayUser={this.props.displayUser}/>
          : null}
      </div>
    </div>
  }
}

export default UserDisplay
