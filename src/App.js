import React from 'react';
import CallsheetDisplay from './components/callsheet/CallsheetDisplay';
import DistroDisplay from './components/distro/DistroDisplay';
import Footer from './components/Footer';
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

let colorPairs = [
  // {
  //   navColor: '#89ABE3FF',
  //   textColor: '#0063B2FF',
  // },
  // {
  //   navColor: '#F68A4C',
  //   textColor: '#FEC64D',
  // },
  {
    navColor: '#F5D10D',
    textColor: '#181818',
  },
  // {
  //   navColor: '#2A3132',
  //   textColor: '#336B87',
  // },
  // {
  //   navColor: '#FCE77D',
  //   textColor: '#F96167',
  // },
  // {
  //   navColor: '#3D155F',
  //   textColor: '#DF678C',
  // },
  // {
  //   navColor: '#358597',
  //   textColor: '#F4A896',
  // }
]


class App extends React.Component {
  state = {
    users: [],
    displayUser: '',
    route: '',
    isLoggedIn: false,
    loginShow: false,
    signupShow: false,
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

  // This is me venting after a long night of session work ><
  colorRandomizer = () => {
    let combo = colorPairs[Math.floor(Math.random() * colorPairs.length)]
    this.setState({
      navColor:combo.navColor,
      textColor:combo.textColor
    })
  }

  componentDidMount = () => {
    this.colorRandomizer()
    axios.get('https://distro-app-api.herokuapp.com/session', {withCredentials:true}).then((response) => {
      if(response.data.role === "admin") {
        axios.get('https://distro-app-api.herokuapp.com/users').then(
          (response) => {
            this.setState({
              isLoggedIn:true,
              users: response.data,
              role: 'admin'
            }
          )
        })
      } else if(response.data.role === "user") {
        axios.get('https://distro-app-api.herokuapp.com/users/user/' + response.data.email).then(
          (response) => {
            this.setState({
              isLoggedIn:true,
              users: response.data,
              role: 'user'
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

  login = (obj) => {
    // Post Request to API SESSION (NOT WORKING YET)
    // console.log(obj);
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
          <Modal show={this.state.signupShow} onHide={this.toggleSignUp}>
            <ModalHeader>
              <ModalTitle>Modal</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <SignUpDisplay signup={this.signup}/>
            </ModalBody>
          </Modal> : null}
        {this.state.isLoggedIn && this.state.users[0] && this.state.role === "user"? <SingleUserDisplay user={this.state.users[0]}/> : null}
        {this.state.route === "" && this.state.isLoggedIn ? <div></div> : null}
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
        {!this.state.isLoggedIn ? <SplashScreen textColor={this.state.textColor}/> : null}
        <Footer navColor={this.state.navColor}/>
      </div>
    )
  }
}


export default App;
