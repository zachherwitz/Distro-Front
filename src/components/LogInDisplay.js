import React from 'react';

class LogInDisplay extends React.Component {

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

  handleLogin = (e) => {
    e.preventDefault()
    let newLogin = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(newLogin)
  }


  render = () => {
    return <React.Fragment>
      <form onSubmit={this.handleLogin}>
        <div className="signup-input-container">
          <input
            type="text"
            required
            placeholder="email"
            onKeyUp={this.handleInput}
            id="email"/>
          <input
            type="password"
            required
            placeholder="password"
            onKeyUp={this.handleInput}
            id="password"/>
          </div>
        <input type="submit" value="Log In"/>
      </form>
    </React.Fragment>
  }
}

export default LogInDisplay
