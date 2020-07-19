import React from 'react';
import NewCallsheetForm from './NewCallsheetForm'
import { CSSTransition } from 'react-transition-group';


class CallsheetDisplay extends React.Component {
  state = {
    callsheet: this.props.callsheet,
    submittedCallsheet: false
  }

  toggleSubmitted = () => {
    this.setState({
      submittedCallsheet:!this.state.submittedCallsheet
    }, () => {
      setTimeout(() => {
        this.setState({
          submittedCallsheet:!this.state.submittedCallsheet
        })
      }, 3000)
    })
  }

  render = () => {
    const {callsheet} = this.state.callsheet;
    return <div className="callsheet">
      <div className="callsheet-left"></div>
      <div className="callsheet-container">
        <h1>Create a Callsheet</h1>
        <NewCallsheetForm
          toggleSubmitted={this.toggleSubmitted}
          createCallsheet={this.props.createCallsheet}
          allUsers={this.props.allUsers} />
        <CSSTransition in={this.state.submittedCallsheet} timeout={200} classNames="callsheet-submitted-alert">
          {this.state.submittedCallsheet ? <h2>Callsheet Submitted!</h2> : <div></div>}
        </CSSTransition>
      </div>
      <div className="callsheet-right"></div>
    </div>
  }
}


export default CallsheetDisplay
