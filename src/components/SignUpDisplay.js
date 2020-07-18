import React from 'react';

class SignUpDisplay extends React.Component {
  state = {
    toggleAdvancedSetup: false,
    numOfDistroInputs: ['index']
  }

  additionalDistro = (e) => {
    e.preventDefault()
    let numOfDistroInputsArray = this.state.numOfDistroInputs;
    numOfDistroInputsArray.push('index');
    this.setState({
      numOfDistroInputs:numOfDistroInputsArray
    })
  }

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

      // console.log(distroArray);
    })

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
    console.log(newSignup);
    this.props.signup(newSignup)
  }

  toggleAdvancedSetup = (e) => {
    e.preventDefault()
    this.setState({
      toggleAdvancedSetup:true
    })
  }

  render = () => {
    return <div>
      <h1>CREATE NEW USER</h1>
      <form onSubmit={this.handleSignup}>
        <input
          type="email"
          required
          placeholder="email"
          onKeyUp={this.handleInput}
          id="email"
        />
        <br/>
        <input
          type="text"
          required
          placeholder="password"
          onKeyUp={this.handleInput}
          id="password"
        />
        <br/>
        <input
          type="text"
          required
          placeholder="name"
          onKeyUp={this.handleInput}
          id="name"
        />
        <br/>
        {!this.state.toggleAdvancedSetup
        ?
          <button onClick={this.toggleAdvancedSetup}>Advanced Setup</button>
        :
        <div>
          <input
            type="text"
            placeholder="department"
            onKeyUp={this.handleInput}
            id="department"
          />
          <br/>
          <input
            type="text"
            placeholder="phone"
            onKeyUp={this.handleInput}
            id="phone"
          />
          <br/>
          <input
            type="text"
            placeholder="title"
            onKeyUp={this.handleInput}
            id="title"
          />
          <br/>
          <input
            type="text"
            placeholder="admin or user"
            onKeyUp={this.handleInput}
            id="role"
          />
          <br/>
          {this.state.numOfDistroInputs.map((input, index) => {
            return <div key={index}>
              <input
                type="text"
                placeholder="distros"
                onKeyUp={this.handleDistros}
                id={"distro" + index}
              />
              <button onClick={this.additionalDistro}>+</button>
            </div>
          })}
        </div>
      }
        <br/>
        <input type="submit" value="Sign Up"/>
      </form>
    </div>
  }
}

export default SignUpDisplay
