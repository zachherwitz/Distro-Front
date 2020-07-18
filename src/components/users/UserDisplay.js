import React from 'react';
import AllUsers from './AllUsers';
import NewUserForm from  './NewUserForm';
import SingleUser from './SingleUser';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";


class UserDisplay extends React.Component {
  state = {
    showNewUserForm:false
  }

  toggleNewUserForm = () => {
    this.setState({
      showNewUserForm:!this.state.showNewUserForm
    })
  }

  render = () => {
    return <div>
      <button onClick={this.toggleNewUserForm}>CREATE NEW USER</button>
      <div>
        <AllUsers
          allUsers={this.props.allUsers}
          displayUserProfile={this.props.displayUserProfile}/>
        {this.props.displayUser ?
          <Modal show={this.props.displayUser} onHide={this.props.clearDisplayedUser}>
            <ModalHeader>
              <ModalTitle>Modal</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <SingleUser
                displayUser={this.props.displayUser}
                refreshSingleUser={this.props.refreshSingleUser}
                refreshUserList={this.props.refreshUserList}
                clearDisplayedUser={this.props.clearDisplayedUser}/>
            </ModalBody>
          </Modal> : null}
      </div>
      <Modal show={this.state.showNewUserForm} onHide={this.toggleNewUserForm}>
        <ModalHeader>
          <ModalTitle>Modal</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <NewUserForm refreshUserList={this.props.refreshUserList}/>
        </ModalBody>
      </Modal>
    </div>
  }
}

export default UserDisplay
