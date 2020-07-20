import React from 'react'

class SingleUserDisplay extends React.Component {
  render = () => {
    // console.log(JSON.stringify(this.props.callsheet));
    return <div>
      <h2>{this.props.user.name}</h2>
      <div>
        {this.props.callsheet ?
          <div>
            <h3>DATE: {this.props.callsheet.date}</h3>
            <h3>PROJECT: {this.props.callsheet.projectTitle}</h3>
          </div> : null }
        <h4>CALL: {this.props.user.callsheet.callTime}</h4>
        <h4>REPORT TO {this.props.user.callsheet.location}</h4>
      </div>
    </div>
  }
}

export default SingleUserDisplay
