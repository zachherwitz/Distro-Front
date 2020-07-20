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
    window.open(`mailto:${emailAddresses}`)
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
      <form className="distro-search-form" onSubmit={this.search}>
        <h1>Search by Name, Department, or Distro Group</h1>
        <div>
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
          </div>
        <input id="search-submit" type="submit" value="Search"/>
      </form>
      <div className="distro-search-results">
        {this.state.returnedUsers ? <hr></hr> : null}
        {this.state.returnedUsers ? <h1>Users Found: </h1> : null}
        {this.state.returnedUsers ? <h3>Select 'Collect Emails' to generate a blank email to group</h3>
 : null}
        {this.state.returnedUsers ? this.state.returnedUsers.map(
          (user, index) => {
            return <li key={index}>{user.name} - {user.department} - {user.title?user.title + " - ":null} {user.email}</li>
        }) : null}
        {this.state.returnedUsers ? <button id="collect-emails-button" onClick={this.collectEmails}>Collect Emails</button> : null}

      </div>
    </div>
  }
}



export default DistroDisplay
