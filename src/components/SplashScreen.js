import React from 'react';
import Splash from './../images/splash/SplashHeroCropped.png'

// This is displayed when a user is not logged in, and visits the website
class SplashScreen extends React.Component {
  render = () => {
    return <div
    className="splash-page">
      <div className="splash-text">
        <h1>Contacts, Contactless</h1>
        <ul>
          <li className="splash1">Create Your Account</li>
          <li className="splash2">Add Your Team</li>
          <li className="splash3">Make a Movie</li>
          <button onClick={this.props.toggleSignUp}>SIGN UP</button>
        </ul>
      </div>
      <div className="splash-image-container">
        <img src={Splash} alt="illustrations by Olivia McGiff https://www.instagram.com/oliviamcgiff/?hl=en"/>
      </div>
    </div>
  }
}

export default SplashScreen
