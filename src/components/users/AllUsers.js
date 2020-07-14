import React from 'react';

class AllUsers extends React.Component {
  render = () => {
    return <div>
      <h1>This is my ALLUSERS component</h1>
      <ul> Users:
        {this.props.allUsers.map((user, index) => {
          return <li key={index} id={index} onClick={this.props.displayUserProfile}> {user.name} </li>
        })}
      </ul>
    </div>
  }
}

export default AllUsers
