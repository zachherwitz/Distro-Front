import React from 'react';
import CallsheetCreate from './components/CallsheetCreate';
import Navigation from './components/Navigation'
import UserDisplay from './components/UserDisplay';


import axios from 'axios';


// TEST <UserTestForm /> to test the users

class App extends React.Component {
  state = {
    users: [],
    displayUser: '',
    route: ''
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

  // Gets and stores all the data as soon as the app is mounted
  componentDidMount = () => {
    axios.get('http://localhost:3000/users').then((response) => {
      this.setState({
        users: response.data
      })
    })
  }

  // Create call sheet based on call sheet object in state
  createCallsheet = (callsheet) => {
    axios.post('http://localhost:3000/callsheet', {
      date: callsheet.date,
      episode: callsheet.episode,
      day: callsheet.day,
      scriptDraft: callsheet.scriptDraft,
      generalCallTime: callsheet.generalCallTime,
      generalLocation: callsheet.generalLocation,
      nearestHospital: callsheet.nearestHospital,
      allCalled: callsheet.allCalled
    }).then(
      (response) => {
        this.setState({callsheet:response.data.createdCallsheet})
    })
  }

  // Display profile information of user on click
  displayUserProfile = (e) => {
    let userToDisplay = this.state.users[e.target.id]
    this.setState({
      displayUser:userToDisplay
    })
  }

  refreshSingleUser = (obj) => {
    let updatedUserToDisplay = obj
    this.setState({
      displayUser: updatedUserToDisplay
    })
  }

  refreshUserList = () => {
    axios.get('http://localhost:3000/users').then((response) => {
      this.setState({
        users: response.data
      })
    })
  }

  render = () => {
    // DESTRUCTURING :: displayUser now equals this.state.displayUser //
    return (
      <div>
        <Navigation changeRoute={this.changeRoute}/>
        {this.state.route === "allUsers" ?
          <UserDisplay
            allUsers={this.state.users}
            clearDisplayedUser={this.clearDisplayedUser}
            displayUser={this.state.displayUser}
            displayUserProfile={this.displayUserProfile}
            refreshSingleUser={this.refreshSingleUser}
            refreshUserList={this.refreshUserList}/>
            : null}
        {this.state.route === "createCallsheet" ?
          <CallsheetCreate
            createCallsheet={this.createCallsheet}/>
            : null}
      </div>
    )
  }
}


export default App;
