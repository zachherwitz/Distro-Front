import React from 'react';
import Splash from './../images/splash/SplashHeroCropped.png'

class SplashScreen extends React.Component {
  render = () => {
    return <div
    className="splash-page">
      <div className="splash-text">
        <h1>Contacts, Contactless</h1>
        <ul>
          <li>Create Your Account</li>
          <li>Add Your Team</li>
          <li>Make a Movie</li>
        </ul>

        <button onClick={this.props.toggleSignUp}>SIGN UP</button>
      </div>
      <div className="splash-image-container">
        <img src={Splash} alt="illustrations by Olivia McGiff https://www.instagram.com/oliviamcgiff/?hl=en"/>
      </div>
    </div>
  }
}

export default SplashScreen
