import React from 'react';

class NavBar extends React.Component {
  render = () => {
    return <nav style={{background:this.props.navColor}}>
      <div className="nav-logo" style={{color:this.props.textColor}}>d<span>|</span>STRO</div>
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
              Callsheet
            </button>
            <button
              route="distro"
              onClick={this.props.changeRoute}>
              Distro
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
