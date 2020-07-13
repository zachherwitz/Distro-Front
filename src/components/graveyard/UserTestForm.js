import React from 'react';
import axios from 'axios';

class UserTestForm extends React.Component {
  state = {
    distroResults: [],
    user: {
      callsheet: {
        callTime: null,
        location: ""
      },
      department: "",
      distros: [],
      email: "",
      name: "",
      phone: "",
      projectId: "",
      role: ""
    }
  }

  distroSearch = (e) => {
    e.preventDefault()
    axios.get('http://localhost:3000/users').then((response) => {
      let results = []
      console.log(response.data);
      response.data.map((user, index) => {
        user.distros.map((distro, index) => {
          if (distro === this.distroName.value) {
            results.push(user.name)
          }
        })
      })
      this.setState({
        distroResults:results
      })
    })
  }

  nameSearch = (e) => {
    e.preventDefault();
    axios.get('http://localhost:3000/users').then((response) => {
      console.log(response.data);
      response.data.map((user, index) => {
        if (user.name === this.searchName.value) {
          console.log('Its a match!');
          this.setState({
            user: response.data[index]
          })
        }
      })
    })
  }

  render = () => {
    const {user} = this.state;
    const {distroResults} = this.state;
    return <div className="container">
      <form onSubmit={this.nameSearch}>
        <input ref={input => this.searchName = input} type="text" placeholder="enter name"/>
        <input type="submit" value="search for name" />
      </form>
      <form onSubmit={this.distroSearch}>
        <input ref={input => this.distroName = input} type="text" placeholder="enter distros"/>
        <input type="submit" value="search for distros" />
      </form>
      <div>
        {distroResults[0] ?
        <ul>
          {distroResults.map((distroResult, index) => {
            return <li key={index}>{distroResult}</li>
          })}
        </ul> : null}
      </div>
      <div>
        {user.name ?
        <div>
          <h1>{user.name}</h1> <br/>
          <p>{user.department}</p> <br/><br/>
          <p>{user.callsheet.callTime ? "Call Time: " + user.callsheet.callTime : null }</p><br/>
          <p>{user.callsheet.location ? "Location: " + user.callsheet.location : null}</p><br/><br/>
          <ul> Distro Lists:
            {user.distros.map((distro, index) => {
              return <li key={index}>{distro}</li>
            })}
          </ul>
        </div> : null }
      </div>
    </div>
  }
}


export default UserTestForm;
