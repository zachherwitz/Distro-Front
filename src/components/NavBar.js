import React from 'react';
import LogInDisplay from './LogInDisplay';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

// NavBar acts as a button holder, but each button has a 'route' attribute. When pressed, each button passes the 'route' to the App component, where it is then used to determine what section of the site to display.

class NavBar extends React.Component {
  state = {
    showLogin: false
  }

  toggleLogin = () => {
    this.setState({
      showLogin:!this.state.showLogin
    })
  }

  render = () => {
    return <div className="navigation">
      <div className="nav-logo">d<span>|</span>STRO</div>
      {this.props.isLoggedIn ?
        <div className="nav-buttons-admin">
        {this.props.role === 'admin' ?
          <React.Fragment>
            <div
              route="allUsers"
              onClick={this.props.changeRoute}>
              Users
            </div>
            <div
              route="createCallsheet"
              onClick={this.props.changeRoute}>
              Callsheet
            </div>
            <div
              route="distro"
              onClick={this.props.changeRoute}>
              Distro
            </div>
          </React.Fragment>
          : null
        }
          <div onClick={this.props.logout}>Log Out</div>
        </div>
        :
        <div className="nav-buttons">
          <div onClick={this.props.toggleSignUp}>Sign Up</div>
          <div onClick={this.toggleLogin}>Login</div>
          <Modal
            show={this.state.showLogin}
            onHide={this.toggleLogin}
            dialogClassName="login-modal">
            <ModalBody>
              <LogInDisplay toggleLogin={this.toggleLogin} login={this.props.login}/>
            </ModalBody>
          </Modal>
        </div>
      }
    </div>
  }
}

export default NavBar
