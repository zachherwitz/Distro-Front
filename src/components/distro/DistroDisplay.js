import React from 'react';
import axios from 'axios';

class DistroDisplay extends React.Component{
  state = {
    distroEmails: []
  }

  collectEmails = () => {
    let userEmails = ""
    this.state.returnedUsers.map((user) => {
      userEmails += `${user.email}, `
    })
    console.log(userEmails);
    let emailAddresses = userEmails
    let emailSubject = 'test subject'
    window.open(`mailto:${emailAddresses}?subject=${emailSubject}`)
  }

  search = (e) => {
    e.preventDefault();
    let query = this.searchbar.value
    switch (this.searchtype.value) {
      case 'name':
        console.log(`you searched for the name ${query}`);
        axios.get('https://distro-app-api.herokuapp.com/users/findbyname/' + query).then((response) => {
          console.log(response);
          this.setState({
            returnedUsers: response.data
          })
        })
        break;
      case 'dept':
        console.log(`you searched for the department ${query}`);
        axios.get('https://distro-app-api.herokuapp.com/users/findbydepartment/' + query).then((response) => {
          console.log(response);
          this.setState({
            returnedUsers: response.data
          })
        })
        break;
      case 'distro':
        console.log(`you searched for the distro ${query}`);
        axios.get('https://distro-app-api.herokuapp.com/users/findbydistro/' + query).then((response) => {
          console.log(response);
          this.setState({
            returnedUsers: response.data
          })
        })
        break;
      default:
        break;
    }
  }

  render = () => {
    return <div className="distro-display">
      <h1>Distro Display</h1>
      <form onSubmit={this.search}>
        <select
          id="search-type"
          name="search-type"
          ref={input => this.searchtype = input}>
          <option value="name">name</option>
          <option value="dept">dept</option>
          <option value="distro">distro</option>
        </select>
        <input
          type="text"
          id="search-bar"
          ref={input => this.searchbar = input}
          placeholder="search"/>
        <input type="submit" value="search"/>
      </form>
      {this.state.returnedUsers ? this.state.returnedUsers.map(
        (user, index) => {
          return <li key={index}>{user.name} - {user.department} - {user.email}</li>
      }) : null}
      <button onClick={this.collectEmails}>Collect Emails</button>
    </div>
  }
}



export default DistroDisplay
