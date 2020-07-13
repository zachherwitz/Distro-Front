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
        allUsers={this.props.allUsers}
        createCallsheet={this.props.createCallsheet}
        displayUser={this.state.displayUser} />
    </div>
  }
}


export default CallsheetDisplay
