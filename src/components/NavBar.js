import React from 'react';

class NavBar extends React.Component {
  render = () => {
    return <nav>
      {this.props.isLoggedIn ?
        <div className="nav-buttons">
        {this.props.role === 'admin' ?
          <div>
            <button
              route="allUsers"
              onClick={this.props.changeRoute}>
              Users
            </button>
            <button
              route="createCallsheet"
              onClick={this.props.changeRoute}>
              Callseet
            </button>
          </div>
          : null
        }
          <button onClick={this.props.logout}>Logout</button>
        </div>
        :
        <div className="nav-buttons">
          <button onClick={this.props.toggleSignUp}>SignUp</button>
          <button onClick={this.props.toggleLogIn}>LogIn</button>
        </div>
      }
    </nav>
  }
}

export default NavBar
