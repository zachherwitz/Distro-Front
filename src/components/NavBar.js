import React from 'react';
import LogInDisplay from './LogInDisplay';


class NavBar extends React.Component {
  render = () => {
    return <nav style={{background:this.props.navColor}}>
      <div className="nav-logo" style={{color:this.props.textColor}}>d<span>|</span>STRO</div>
      {this.props.isLoggedIn ?
        <div className="nav-buttons">
        {this.props.role === 'admin' ?
          <React.Fragment>
            <div
              route="allUsers"
              onClick={this.props.changeRoute}>
              Users
            </div>
            <div
              route="createCallsheet"
              onClick={this.props.changeRoute}>
              Callsheet
            </div>
            <div
              route="distro"
              onClick={this.props.changeRoute}>
              Distro
            </div>
          </React.Fragment>
          : null
        }
          <div onClick={this.props.logout}>Logout</div>
        </div>
        :
        <div className="nav-buttons">
          <div onClick={this.props.toggleSignUp}>SignUp</div>
          <LogInDisplay login={this.props.login}/>
        </div>
      }
    </nav>
  }
}

export default NavBar
