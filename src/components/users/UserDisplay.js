import React from 'react';
import AllUsers from './AllUsers';
import NewUserForm from  './NewUserForm';
import SingleUser from './SingleUser';
import SignUpDisplay from '../SignUpDisplay';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import UserIllustration from "../../images/user/UserIllustration.png"

class UserDisplay extends React.Component {
  state = {
    showNewUserForm:false,
    allUserDisplay: true
  }

  toggleNewUserFormTrue = () => {
    this.setState({
      showNewUserForm:true
    })
  }

  toggleNewUserFormFalse = () => {
    this.setState({
      showNewUserForm:false
    })
  }

  toggleAllUserDisplay = () => {
    this.setState({
      allUserDisplay:!this.state.allUserDisplay
    })
  }

  render = () => {
    return <div className="admin-user-display">
      <button id="admin-user-button" onClick={this.toggleAllUserDisplay}>ALL USERS</button>
      <button id="admin-user-button" onClick={this.toggleNewUserFormTrue}>CREATE NEW USER</button>
      <div className="admin-allusers">
        {this.state.allUserDisplay ?
          <AllUsers
            callsheet={this.props.callsheet}
            allUsers={this.props.allUsers}
            displayUserProfile={this.props.displayUserProfile}/> : null}
          {this.props.displayUser ?
            <Modal
              show={this.props.displayUser}
              onHide={this.props.clearDisplayedUser}
              size="lg"
              dialogClassName="signup-modal">
              <ModalBody>
                <SingleUser
                  callsheet={this.props.callsheet}
                  displayUser={this.props.displayUser}
                  refreshSingleUser={this.props.refreshSingleUser}
                  refreshUserList={this.props.refreshUserList}
                  clearDisplayedUser={this.props.clearDisplayedUser}/>
              </ModalBody>
            </Modal> : null}
      </div>
      <div className="admin-user-illustration"></div>
      <Modal
        show={this.state.showNewUserForm}
        onHide={this.toggleNewUserFormFalse}
        size="lg"
        dialogClassName="signup-modal">
        <ModalBody>
          <SignUpDisplay src="user" refreshUserList={this.props.refreshUserList} toggle={this.toggleNewUserFormFalse} signup={this.props.signup}/>
        </ModalBody>
      </Modal>
    </div>
  }
}

export default UserDisplay
