import React from 'react';
import axios from 'axios';

class NewUserForm extends React.Component {
  state = {}

  createNewUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users', {
      callsheet: {
        callTime: "",
        location: "",
      },
      name: this.state.name,
      department: this.state.department,
      title: this.state.title,
      email: this.state.email,
      phone: this.state.phone,
      role: 'user'
    }).then((response) => {
      this.props.refreshUserList()
      this.setState({newUserCreated: true})
      this.newName.value = ''
      this.newDepartment.value = ''
      this.newTitle.value = ''
      this.newEmail.value = ''
      this.newPhone.value = ''
      setTimeout(() => {
        this.setState({
          newUserCreated: false,
          name: '',
          department: '',
          title: '',
          email: '',
          phone: ''
        })
      }, 1500)
    })
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

  render = () => {
    return <div>
      <h1>CREATE A NEW USER!</h1>
      <form onSubmit={this.createNewUser}>
        <input
          autoComplete="off"
          required
          ref={input => this.newName = input}
          onKeyUp={this.handleInput}
          id="name"
          type="text"
          placeholder="name"/>
        <br/>
        <input
          autoComplete="off"
          required
          ref={input => this.newDepartment = input}
          onKeyUp={this.handleInput}
          id="department"
          type="text"
          placeholder="department"/>
        <br/>
        <input
          autoComplete="off"
          required
          ref={input => this.newTitle = input}
          onKeyUp={this.handleInput}
          id="title"
          type="text"
          placeholder="title"/>
        <br/>
        <input
          autoComplete="off"
          required
          ref={input => this.newPhone = input}
          onKeyUp={this.handleInput}
          id="phone"
          type="text"
          placeholder="phone number"/>
        <br/>
        <input
          autoComplete="off"
          required
          ref={input => this.newEmail = input}
          onKeyUp={this.handleInput}
          id="email"
          type="email"
          placeholder="email"/>
        <br/>
        <input type="Submit" readOnly value="Create New User"/>
      </form>
      {this.state.newUserCreated?<h3>New crew member added to project!</h3> : null}
    </div>
  }
}

export default NewUserForm
