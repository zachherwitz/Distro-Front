import React from 'react'
import Weather from './Weather'

class SingleUserDisplay extends React.Component {
  render = () => {
    // console.log(JSON.stringify(this.props.callsheet));
    return <div className="user-role-view">
      <div className="user-left"></div>
      <div className="user-information">
        <h2>{this.props.user.name}</h2>
        <div>
          {this.props.callsheet ?
            <div>
              <h3>DATE: {this.props.callsheet.date}</h3>
              <h3>PROJECT: {this.props.callsheet.projectTitle}</h3>
            </div> : null }
          <h4>CALL: {this.props.user.callsheet.callTime}</h4>
          <h4>REPORT TO {this.props.user.callsheet.location}</h4>
          {this.props.callsheet ? <Weather callsheet={this.props.callsheet}/> : null}
        </div>
      </div>
      <div className="user-right"></div>
    </div>
  }
}

export default SingleUserDisplay
