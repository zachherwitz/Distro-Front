import React from 'react';

class LogInDisplay extends React.Component {

  // Takes input and adds information as a property in the state
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

  // Passes newLogin object up to the App component, where it is passed to the Users API to return the user's full info (or all info if the user is an Admin) 
  handleLogin = (e) => {
    e.preventDefault()
    let newLogin = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.toggleLogin()
    this.props.login(newLogin)
  }


  render = () => {
    return <div className="login-form">
      <h1>Login: </h1>
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
        <input id="login-submit" type="submit" value="Log In"/>
      </form>
    </div>
  }
}

export default LogInDisplay
