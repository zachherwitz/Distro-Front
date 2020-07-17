import React from 'react';
import img from '../undraw_working_from_anywhere_ub67.png'

class SplashScreen extends React.Component {
  render = () => {
    return <div style={{color:this.props.textColor}}
    className="splash-page">
    <div className="splash-text">
      <h1>contacts,</h1>
      <h1>contactless</h1>
    </div>
    <div className="splash-img-container">
      <img src={img} alt="" className="splash-img"/>
    </div>
    </div>
  }
}

export default SplashScreen