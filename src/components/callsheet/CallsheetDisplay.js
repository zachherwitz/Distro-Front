import React from 'react';
import NewCallsheetForm from './NewCallsheetForm'

class CallsheetDisplay extends React.Component {
  state = {
    callsheet: this.props.callsheet
  }
  render = () => {
    return <div>
      <h1>This is my Callsheet Display!</h1>
      <NewCallsheetForm
        createCallsheet={this.props.createCallsheet}
        allUsers={this.props.allUsers} />
    </div>
  }
}


export default CallsheetDisplay
