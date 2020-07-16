import React from 'react';
import axios from 'axios';

class UpdateUserForm extends React.Component {
  state = {

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

  updateUser = (e) => {
    e.preventDefault()
    let userId = this.props.displayUser._id;
    let updatedUserObject = {
      name: this.state.name,
      department: this.state.department,
      title: this.state.title,
      phone: this.state.phone,
      email: this.state.email,
      role: this.state.role
    }
    axios.put('https://distro-app-api.herokuapp.com/users/' + userId, updatedUserObject).then((response) => {
      let updatedDisplayUser = response.data.updated;
      this.props.refreshSingleUser(updatedDisplayUser)
    })
  }

  render = () => {
    return <div>
    <form onSubmit={this.updateUser}>
      <input
        autoComplete="off"
        ref={input => this.updatedName = input}
        onKeyUp={this.handleInput}
        id="name"
        type="text"
        defaultValue={this.props.displayUser.name}/>
      <br/>
      <input
        autoComplete="off"
        ref={input => this.updatedDepartment = input}
        onKeyUp={this.handleInput}
        id="department"
        type="text"
        defaultValue={this.props.displayUser.department}/>
      <br/>
      <input
        autoComplete="off"
        ref={input => this.updatedTitle = input}
        onKeyUp={this.handleInput}
        id="title"
        type="text"
        defaultValue={this.props.displayUser.title}/>
      <br/>
      <input
        autoComplete="off"
        ref={input => this.updatedPhone = input}
        onKeyUp={this.handleInput}
        id="phone"
        type="text"
        defaultValue={this.props.displayUser.phone}/>
      <br/>
      <input
        autoComplete="off"
        ref={input => this.updatedEmail = input}
        onKeyUp={this.handleInput}
        id="email"
        type="email"
        defaultValue={this.props.displayUser.email}/>
      <br/>
      <input
        autoComplete="off"
        ref={input => this.updatedRole = input}
        onKeyUp={this.handleInput}
        id="role"
        type="text"
        defaultValue={this.props.displayUser.role}/>
      <br/>
      <input type="Submit" readOnly value="Update User"/>
    </form>
    </div>
  }
}



export default UpdateUserForm
