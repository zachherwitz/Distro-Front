import React from 'react'

class Recipient extends React.Component {
  state = {
    toggleSpecifics:false,
  }

  handleInput = (e) => {
    const attributeId = e.target.getAttribute('id');
    switch (attributeId) {
      case attributeId:
        this.setState({[attributeId]:e.target.value})
        break;
      default:
        break;
    }
  }

  submitSpecs = () => {
    let specCallTime = (this.state.callTime ? this.state.callTime : '');
    let specLocation = (this.state.location ? this.state.location : '');
    this.setState({
      recipientObject: {
        user: this.props.user,
        specCallTime: specCallTime,
        specLocation: specLocation
      }
    }, () => {
      this.props.addUser(this.state.recipientObject);
      this.toggleSpecifics();
    })
  }

  toggleSpecifics = () => {
    this.setState({
      toggleSpecifics:!this.state.toggleSpecifics
    })
  }

  render = () => {
    const { user } = this.props;
    return <div>
      <div style={{display: 'flex'}}>
        <div>
          {user.name} - {user.department} - {user.title}
        </div>
        {this.state.toggleSpecifics ?
          <div>
            <input
              onKeyUp={this.handleInput}
              type="text"
              id="callTime"
              placeholder="specific call time"/>
            <input
              onKeyUp={this.handleInput}
              type="text"
              id="location"
              placeholder="specific location"/>
            <button onClick={this.submitSpecs}>Add To Recipients</button>
          </div>
        : <button onClick={this.toggleSpecifics}>{this.state.toggleSpecifics?'-':'+'}</button>}
      </div>
    </div>
  }
}

export default Recipient
