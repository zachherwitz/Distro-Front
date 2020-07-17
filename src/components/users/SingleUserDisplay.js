import React from 'react'

class SingleUserDisplay extends React.Component {
  render = () => {
    return <div>
      <h2>{this.props.user.name}</h2>
      <div>
        <h4>CALL: {this.props.user.callsheet.callTime}</h4>
        <h4>REPORT TO {this.props.user.callsheet.location}</h4>
        <ul>DEV:: Crew Information:
          <li>Department: {this.props.user.department}</li>
          <li>Title: {this.props.user.title}</li>
          <li>Email: {this.props.user.email}</li>
          <li>Phone: {this.props.user.phone}</li>
          {this.props.user.distros.map((distro, index) => {
            return <li key={index}>Phone: {distro}</li>
          })}
        </ul>
      </div>
    </div>
  }
}

export default SingleUserDisplay
