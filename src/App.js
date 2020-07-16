import React from 'react';
import CallsheetDisplay from './components/callsheet/CallsheetDisplay';
import Navigation from './components/Navigation'
import UserDisplay from './components/users/UserDisplay';


import axios from 'axios';


// TEST <UserTestForm /> to test the users

class App extends React.Component {
  state = {
    users: [],
    displayUser: '',
    route: '',
    isLoggedIn: false,
    loginShow: false,
    signupShow: false
  }

  // Makeshift Route Changing until I can figure out router
  changeRoute = (e) => {
    let updatedRoute = e.target.getAttribute('route');
    this.setState({
      route: updatedRoute
    })
  }

  // Clear displayed user in state after delete
  clearDisplayedUser = () => {
    this.setState({displayUser:''})
  }

  // Gets and stores all the data as soon as the app is mounted
  componentDidMount = () => {

  }

  // Create call sheet based on call sheet object in state
  createCallsheet = (callsheet) => {
    axios.post('https://distro-app-api.herokuapp.com/callsheet', callsheet).then(
      (response) => {
        this.setState({callsheet:response.data.createdCallsheet})
        axios.get('https://distro-app-api.herokuapp.com/users').then((response) => {
          this.setState({
            users: response.data
          })
        })
    })
  }

  // Display profile information of user on click
  displayUserProfile = (e) => {
    let userToDisplay = this.state.users[e.target.id]
    this.setState({
      displayUser:userToDisplay
    })
  }

  refreshSingleUser = (obj) => {
    let updatedUserToDisplay = obj
    this.setState({
      displayUser: updatedUserToDisplay
    })
  }

  refreshUserList = () => {
    axios.get('https://distro-app-api.herokuapp.com/users').then((response) => {
      this.setState({
        users: response.data
      })
    })
  }

  authLogin = (e) => {
    e.preventDefault()
    let credentials = {
      email:this.loginInput.value,
      password: this.passwordInput.value
    }
    axios.post('https://distro-app-api.herokuapp.com/session', credentials).then((response) => {
      if(credentials.email === response.data.email){
        this.setState({
          isLoggedIn: true,
          role: response.data.role
        }, () => {
          axios.get('https://distro-app-api.herokuapp.com/users').then(
            (response) => {
              if (this.state.role === 'user') {
                this.setState({
                  users: 'user'
                })
              } else {
                this.setState({
                  users: response.data
                })
              }
            })
          }
        )
      }
    })
  }

  signup = (e) => {
    e.preventDefault()
    axios.post('https://distro-app-api.herokuapp.com/users', {
      name: this.signupNameInput.value,
      email: this.signupEmailInput.value,
      role: 'admin',
      password: this.signupPasswordInput.value,
      callsheet: {
        callTime: '',
        location: '',
      },
      department: '',
      phone: '',
      projectId: '',
      title: '',
    }).then((response) => {
      console.log(response);
    })
  }

  toggleLogIn = () => {
    this.setState({
      loginShow:!this.state.loginShow,
      signupShow: false
    })
  }

  toggleSignUp = () => {
    this.setState({
      signupShow:!this.state.signupShow,
      loginShow: false
    })
  }

  logout = () => {
    this.setState({
      isLoggedIn:false,
      role: '',
      users: ''
    })
  }

  testsession = () => {
    axios.get('https://distro-app-api.herokuapp.com/session').then(
      (response) => {
        console.log(response);
    })
  }

  deletesession = () => {
    axios.delete('https://distro-app-api.herokuapp.com/session').then(
      (response) => {
        console.log(response);
    })
  }


  render = () => {
    // DESTRUCTURING :: displayUser now equals this.state.displayUser //
    return (
      <div>
        <nav style={{display:'flex', justifyContent:'space-around'}}>
          <button onClick={this.toggleSignUp}>SignUp</button>
          <button onClick={this.toggleLogIn}>LogIn</button>
          <button onClick={this.logout}>Logout</button>
          <button onClick={this.testsession}>testsession</button>
          <button onClick={this.deletesession}>deletesessions</button>
        </nav>
        {this.state.loginShow ?
          <form onSubmit={this.authLogin}>
            <input
              type="text"
              placeholder="email"
              ref={input => this.loginInput = input}/>
            <input
              type="text"
              placeholder="password"
              ref={input => this.passwordInput = input}/>
            <input type="submit" value="Log In"/>
          </form> : null}
        {this.state.signupShow ?
          <form onSubmit={this.signup}>
            <input
              type="text"
              placeholder="email"
              ref={input => this.signupEmailInput = input}/>
            <input
              type="text"
              placeholder="password"
              ref={input => this.signupPasswordInput = input}/>
            <input
              type="text"
              placeholder="name"
              ref={input => this.signupNameInput = input}/>
            <input type="submit" value="Sign Up"/>
          </form> : null}
        {this.state.isLoggedIn && this.state.role === "admin"? <Navigation changeRoute={this.changeRoute}/> : null}
        {this.state.isLoggedIn && this.state.role === "user"? <h1>USER VIEW</h1> : null}
        {this.state.route === "allUsers" && this.state.isLoggedIn ?
          <UserDisplay
            allUsers={this.state.users}
            clearDisplayedUser={this.clearDisplayedUser}
            displayUser={this.state.displayUser}
            displayUserProfile={this.displayUserProfile}
            refreshSingleUser={this.refreshSingleUser}
            refreshUserList={this.refreshUserList}/>
            : null}
        {this.state.route === "createCallsheet" && this.state.isLoggedIn ?
          <CallsheetDisplay
            allUsers={this.state.users}
            callsheet={this.state.callsheet}
            createCallsheet={this.createCallsheet}/>
            : null}
      </div>
    )
  }
}


export default App;
