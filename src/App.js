import React from 'react';
import CallsheetDisplay from './components/callsheet/CallsheetDisplay';
import DistroDisplay from './components/distro/DistroDisplay';
import LogInDisplay from './components/LogInDisplay';
import NavBar from './components/NavBar'
import SingleUserDisplay from './components/users/SingleUserDisplay';
import SignUpDisplay from './components/SignUpDisplay';
import UserDisplay from './components/users/UserDisplay';

import axios from 'axios';

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

  login = (obj) => {
    // Post Request to API SESSION (NOT WORKING YET)
    // console.log(obj);
    axios.post('https://distro-app-api.herokuapp.com/session', obj).then((response) => {
      if(obj.email === response.data.email){
        this.setState({
          isLoggedIn: true,
          role: response.data.role
        }, () => {
          if(this.state.role === 'user') {
            // IF ROLE IS USER, SEND BACK JUST THE USER'S INFO
            axios.get('https://distro-app-api.herokuapp.com/users/user/' + obj.email).then(
              (response) => {
                this.setState({
                  users: response.data
                })
            })
          } else if(this.state.role === 'admin') {
            // IF ROLE IS ADMIN, SEND BACK ALL USERS' INFO
            axios.get('https://distro-app-api.herokuapp.com/users').then(
              (response) => {
                this.setState({
                  users: response.data
                }
              )
            })
          }}
        )
      }
      this.toggleLogIn()
    })
  }

  // Cheap and easy logout by refreshing the page
  logout = () => {
    window.location.reload();
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


  // Passes credentials to axios Post route, but does not log user in
  signup = (obj) => {
    axios.post('https://distro-app-api.herokuapp.com/users', {
      name: obj.name,
      email: obj.email,
      role: 'admin',
      password: obj.password,
      callsheet: {
        callTime: '',
        location: '',
      },
      department: '',
      phone: '',
      projectId: '',
      title: '',
    }).then((response) => {
      console.log('new user created');
      this.toggleSignUp()
    })
  }

  // Opens Login Form
  toggleLogIn = () => {
    this.setState({
      loginShow:!this.state.loginShow,
      signupShow: false
    })
  }

  // Opens Signup Form
  toggleSignUp = () => {
    this.setState({
      signupShow:!this.state.signupShow,
      loginShow: false
    })
  }

  testsession = () => {
    axios.get('https://distro-app-api.herokuapp.com/session')
  }

  render = () => {
    return (
      <div className={'app-container'}>
        <button onClick={this.testsession}>test session</button>
        <NavBar
          changeRoute={this.changeRoute}
          isLoggedIn={this.state.isLoggedIn}
          logout={this.logout}
          role={this.state.role}
          toggleSignUp={this.toggleSignUp}
          toggleLogIn={this.toggleLogIn}
        />
        {this.state.loginShow ? <LogInDisplay login={this.login}/> : null}
        {this.state.signupShow ? <SignUpDisplay signup={this.signup}/> : null}
        {this.state.isLoggedIn && this.state.users[0] && this.state.role === "user"? <SingleUserDisplay user={this.state.users[0]}/> : null}
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
        {this.state.route === "distro" && this.state.isLoggedIn ?
          <DistroDisplay/>
            : null}
      </div>
    )
  }
}


export default App;
