import React from 'react';
import CallsheetDisplay from './components/callsheet/CallsheetDisplay';
import DistroDisplay from './components/distro/DistroDisplay';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import NavBar from './components/NavBar'
import SingleUserDisplay from './components/users/SingleUserDisplay';
import SignUpDisplay from './components/SignUpDisplay';
import SplashScreen from './components/SplashScreen';
import UserDisplay from './components/users/UserDisplay';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

class App extends React.Component {
  state = {
    users: [],
    displayUser: '',
    route: '',
    isLoggedIn: false,
    loginShow: false,
    signupShow: false,
  }

  // Change the page based on 'route' attribute of target
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
        axios.get('https://distro-app-api.herokuapp.com/callsheet').then((response) => {
          this.setState({
            callsheet: response.data[response.data.length - 1]
          })
        })
        axios.get('https://distro-app-api.herokuapp.com/users').then((response) => {
          this.setState({
            users: response.data
          })
        })
    })
  }

  componentDidMount = () => {
    // Check to see if there is session data to maintain login
    axios.get('https://distro-app-api.herokuapp.com/session', {withCredentials:true}).then((response) => {
      if(response.data.role === "admin") {
        // if the user has the role of 'admin', set the state to have a role of 'admin' and push all user data into the state
        axios.get('https://distro-app-api.herokuapp.com/users').then(
          (response) => {
            this.setState({
              isLoggedIn:true,
              users: response.data,
              role: 'admin'
            }
          )
          // Get the current callsheet data
          axios.get('https://distro-app-api.herokuapp.com/callsheet').then((response) => {
            this.setState({
              callsheet: response.data[response.data.length - 1]
            })
          })
        })
      } else if(response.data.role === "user") {
        // if the user has the role of 'user', set the state to have a role of 'user' and push the specific user's information into the state
        axios.get('https://distro-app-api.herokuapp.com/users/user/' + response.data.email).then(
          (response) => {
            this.setState({
              isLoggedIn:true,
              users: response.data,
              role: 'user'
            })
          // Get the current callsheet data (for weather and project name)
          axios.get('https://distro-app-api.herokuapp.com/callsheet').then((response) => {
            this.setState({
              callsheet: response.data[response.data.length - 1]
            })
          })
        })
      }
    })
  }

  // Display profile information of user on click
  displayUserProfile = (e) => {
    let userToDisplay = this.state.users[e.target.id]
    this.setState({
      displayUser:userToDisplay
    })
  }

  // Login is pretty much the same functionality as ComponentDidMount, except there is a POST request to the API instead of a GET
  login = (obj) => {
    // Post Request to API SESSION
    axios.post('https://distro-app-api.herokuapp.com/session', obj, {withCredentials:true}).then((response) => {
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
                }, () => {
                  axios.get('https://distro-app-api.herokuapp.com/callsheet').then((response) => {
                    this.setState({
                      callsheet: response.data[response.data.length - 1]
                    })
                  })
                })
            })
          } else if(this.state.role === 'admin') {
            // IF ROLE IS ADMIN, SEND BACK ALL USERS' INFO
            axios.get('https://distro-app-api.herokuapp.com/users').then(
              (response) => {
                this.setState({
                  users: response.data
                }, () => {
                  axios.get('https://distro-app-api.herokuapp.com/callsheet').then((response) => {
                    this.setState({
                      callsheet: response.data[response.data.length - 1]
                    })
                  })
                })
              })
            }
          }
        )
      }
      this.toggleLogIn()
    })
  }

  // Make a DELETE request to the session API, effectively logging the user out
  logout = () => {
    axios.delete('https://distro-app-api.herokuapp.com/session', {withCredentials:true}).then(
      (response) => {
        this.setState({
          isLoggedIn:false,
          role: '',
          users: ''
        })
        console.log(response);
        window.location.reload();
    })
  }

  // Refreshes the specific user information
  refreshSingleUser = (obj) => {
    let updatedUserToDisplay = obj
    this.setState({
      displayUser: updatedUserToDisplay
    })
  }

  // Refreshes list of all users any time a user is updated, deleted, or created in the 'Users' tab
  refreshUserList = () => {
    console.log('refreshing user list');
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
      role: obj.role || 'admin',
      password: obj.password,
      callsheet: {
        callTime: '',
        location: '',
      },
      department: obj.department,
      phone: obj.phone,
      projectId: '',
      title: obj.title,
      distros: obj.distros
    }).then((response) => {
      console.log('new user created');
      if(obj.src === 'splash'){
        this.toggleSignUp()
      }
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

  render = () => {
    return (
      <div className={'app-container'}>
        <NavBar
          changeRoute={this.changeRoute}
          isLoggedIn={this.state.isLoggedIn}
          logout={this.logout}
          loginShow={this.state.loginShow}
          login={this.login}
          role={this.state.role}
          toggleSignUp={this.toggleSignUp}
          toggleLogIn={this.toggleLogIn}
          navColor={this.state.navColor}
          textColor={this.state.textColor}
        />
        {this.state.signupShow ?
          <Modal
            show={this.state.signupShow}
            onHide={this.toggleSignUp}
            size="lg"
            dialogClassName="signup-modal">
            <ModalBody>
              <SignUpDisplay src="splash" signup={this.signup}/>
            </ModalBody>
          </Modal> : null}
        {this.state.isLoggedIn && this.state.users[0] && this.state.role === "user"? <SingleUserDisplay callsheet={this.state.callsheet} user={this.state.users[0]}/> : null}
        {this.state.route === "" && this.state.isLoggedIn && this.state.role === "admin" ? <Homepage changeRoute={this.changeRoute}/> : null}
        {this.state.route === "allUsers" && this.state.isLoggedIn ?
          <UserDisplay
            callsheet={this.state.callsheet}
            allUsers={this.state.users}
            clearDisplayedUser={this.clearDisplayedUser}
            displayUser={this.state.displayUser}
            displayUserProfile={this.displayUserProfile}
            refreshSingleUser={this.refreshSingleUser}
            refreshUserList={this.refreshUserList}
            signup={this.signup}/>
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
        {!this.state.isLoggedIn ?
          <SplashScreen
            textColor={this.state.textColor}
            toggleSignUp={this.toggleSignUp}/> : null}
        <Footer navColor={this.state.navColor}/>
      </div>
    )
  }
}


export default App;
