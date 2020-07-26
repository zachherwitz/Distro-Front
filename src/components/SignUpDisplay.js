import React from 'react';

// This is the module that pops up whenever a user clicks 'Sign Up', or when an Admin creates a new user
class SignUpDisplay extends React.Component {
  state = {
    toggleAdvancedSetup: false,
    numOfDistroInputs: ['index']
  }

  // Add additionaly distro inputs
  additionalDistro = (e) => {
    e.preventDefault()
    let numOfDistroInputsArray = this.state.numOfDistroInputs;
    numOfDistroInputsArray.push('index');
    this.setState({
      numOfDistroInputs:numOfDistroInputsArray
    })
  }

  // Takes input and adds to a distro array in the state
  handleDistros = (e) => {
    const attributeId = e.target.getAttribute('id');
    switch (attributeId) {
      case attributeId:
        this.setState({[attributeId]:e.target.value})
        break;
      default:
        break;
    }
  }

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

  // Creates a new object using the current State (values inputted into the form) and then passes that object up to the App component, where it is used to make a POST request to the users API.
  handleSignup = (e) => {
    e.preventDefault()
    if(this.props.toggle) {
      this.props.toggle()
    }
    let distroArray = []
    this.state.numOfDistroInputs.map((input, index) => {
      let distroNum = "distro" + index
      if(this.state[distroNum]){
        let distroValue = this.state[distroNum].trim()
        distroArray.push(distroValue.toLowerCase())
      }
    })
    // Object to be pushed up to the App component
    let newSignup = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      department: this.state.department,
      phone: this.state.phone,
      title: this.state.title,
      role: this.state.role,
      distros: distroArray,
      src: this.props.src
    }
    this.props.signup(newSignup)
    if(this.props.refreshAllUsers) {
      this.props.refreshAllUsers();
    }
  }

  // Toggles the display of advanced options in the signup form
  toggleAdvancedSetup = (e) => {
    e.preventDefault()
    this.setState({
      toggleAdvancedSetup:true
    })
  }

  render = () => {
    return <div className="signup-form">
      <h1>Create a new user: </h1>
      <form onSubmit={this.handleSignup}>
        <div className="signup-input-container">
          <input
            type="email"
            required
            placeholder="email"
            onKeyUp={this.handleInput}
            id="email"
          />
          <input
            type="text"
            required
            placeholder="password"
            onKeyUp={this.handleInput}
            id="password"
          />
          <input
            type="text"
            required
            placeholder="name"
            onKeyUp={this.handleInput}
            id="name"
          />
        </div>
        <hr></hr>
        {!this.state.toggleAdvancedSetup
        ?
          <button className="signup-advanced-button" onClick={this.toggleAdvancedSetup}>Advanced Setup</button>
        :
        <div className="signup-extra-input-container">
          <input
            type="text"
            placeholder="department"
            onKeyUp={this.handleInput}
            id="department"
          />
          <input
            type="text"
            placeholder="phone"
            onKeyUp={this.handleInput}
            id="phone"
          />
          <input
            type="text"
            placeholder="title"
            onKeyUp={this.handleInput}
            id="title"
          />
          <input
            type="text"
            placeholder="admin or user"
            onKeyUp={this.handleInput}
            id="role"
          />
          <div className="distro-container">
            <div>
              {this.state.numOfDistroInputs.map((input, index) => {
                return <div key={index}>
                  <input
                    type="text"
                    placeholder="distros"
                    onKeyUp={this.handleDistros}
                    id={"distro" + index}
                  />
                  <button className="signup-distro-button" onClick={this.additionalDistro}>+</button>
                </div>
              })}
            </div>
            <p>A distro is a distribution group, but think of it like a tag. You will be able to sort through your project using distros, so add as many as you like.</p>
          </div>
        </div>
      }
        <input id="signup-submit" type="submit" value="Sign Up"/>
      </form>
    </div>
  }
}

export default SignUpDisplay
