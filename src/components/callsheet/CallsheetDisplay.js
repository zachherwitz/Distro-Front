import React from 'react';
import NewCallsheetForm from './NewCallsheetForm'

class CallsheetDisplay extends React.Component {
  state = {
    callsheet: this.props.callsheet
  }
  render = () => {
    return <div className="callsheet">
      <div className="callsheet-left"></div>
      <div className="callsheet-container">
        <NewCallsheetForm
          createCallsheet={this.props.createCallsheet}
          allUsers={this.props.allUsers} />
      </div>
      <div className="callsheet-right"></div>
    </div>
  }
}


export default CallsheetDisplay
