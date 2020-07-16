import React from 'react';

class SignUpDisplay extends React.Component {
  state = {
    email: '',
    password: '',
    name: ''
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

  handleSignup = (e) => {
    e.preventDefault()
    let newSignup = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    this.props.signup(newSignup)
  }

  render = () => {
    return <div>
      <h1>SIGN UP</h1>
      <form onSubmit={this.handleSignup}>
        <input
          type="email"
          required
          placeholder="email"
          onKeyUp={this.handleInput}
          id="email"/>
        <input
          type="text"
          required
          placeholder="password"
          onKeyUp={this.handleInput}
          id="password"/>
        <input
          type="text"
          required
          placeholder="name"
          onKeyUp={this.handleInput}
          id="name"/>
        <input type="submit" value="Sign Up"/>
      </form>
    </div>
  }
}

export default SignUpDisplay
