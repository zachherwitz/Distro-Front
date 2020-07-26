import React from 'react';

// This is the desplay a logged in user will see, giving them descriptions of each route, and its intended functionality.

class Homepage extends React.Component {
  render = () => {
    return <div className="homepage">
      <div className="homepage-section-container">
        <section id="user-section">
          <h1>USERS</h1>
          <div>Create new user profiles to add members to your team! <br/><br/> Update or delete user profiles to make changes to your crew! <br/><br/> Check individual crew call times, locations, and contact information. <br/><br/> View all crew members at once! </div>
          <button
            className="homepage-button"
            route="allUsers"
            onClick={this.props.changeRoute}>VIEW</button>
        </section>
        <section id="callsheet-section">
          <h1>CALLSHEET</h1>
          <div>Create a new callsheet with general call times, location, script info, safety notes, and much more. <br/><br/> Add recipients from a list of all crew members. Add unique call times or locations for specific users. <br/><br/> Deseminate personalized information to all recipients with a click of a button.</div>
          <button
            className="homepage-button"
            route="createCallsheet"
            onClick={this.props.changeRoute}>START</button>
        </section>
        <section id="distro-section">
          <h1>DISTRO</h1>
          <div>Filter through all crew members by name, department, or distro group. <br/><br/> Sending emails to single users or entire departments has never been simpler</div>
          <button
            className="homepage-button"
            route="distro"
            onClick={this.props.changeRoute}>EXPLORE</button>
        </section>
      </div>

    </div>
  }
}

export default Homepage
