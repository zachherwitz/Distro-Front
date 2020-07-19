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


class UserDisplay extends React.Component {
  state = {
    showNewUserForm:false
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

  render = () => {
    return <div>
      <button onClick={this.toggleNewUserFormTrue}>CREATE NEW USER</button>
      <div>
        <AllUsers
          allUsers={this.props.allUsers}
          displayUserProfile={this.props.displayUserProfile}/>
        {this.props.displayUser ?
          <Modal
            show={this.props.displayUser}
            onHide={this.props.clearDisplayedUser}
            size="lg"
            dialogClassName="signup-modal">
            <ModalBody>
              <SingleUser
                displayUser={this.props.displayUser}
                refreshSingleUser={this.props.refreshSingleUser}
                refreshUserList={this.props.refreshUserList}
                clearDisplayedUser={this.props.clearDisplayedUser}/>
            </ModalBody>
          </Modal> : null}
      </div>
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
