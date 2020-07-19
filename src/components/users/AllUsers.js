import React from 'react';

class AllUsers extends React.Component {
  render = () => {
    return <div className="admin-allusers-container">
      {this.props.allUsers.map((user, index) => {
        return <h3 key={index} id={index} onClick={this.props.displayUserProfile}> {user.name} </h3>
      })}
    </div>
  }
}

export default AllUsers
