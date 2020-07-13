import React from 'react';

class SingleUser extends React.Component {
  render = () => {
    return <div style={{padding: '20px', border: '2px dotted grey', background: 'thistle'}}>
      <h1>This is my SINGLEUSER component</h1>
      <h2>{this.props.displayUser.name}</h2>
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
    </div>
  }
}

export default SingleUser
