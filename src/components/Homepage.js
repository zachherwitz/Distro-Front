import React from 'react';

class Homepage extends React.Component {
  render = () => {
    return <div className="homepage">
      <div className="homepage-section-container">
        <section className="user-section">
          <h1>USERS</h1>
          <p>Create new user profiles to add members to your team! Update or delete user profiles to make changes to your crew! Check individual crew call times, locations, and contact information. View all crew members at once! </p>
          <button
            className="homepage-button"
            route="allUsers"
            onClick={this.props.changeRoute}>VIEW</button>
        </section>
        <section className="callsheet-section">
          <h1>CALLSHEET</h1>
          <p>Create a new callsheet with general call times, location, script info, safety notes, and much more. Add recipients from a list of all crew members. Add unique call times or locations for specific users. Deseminate personalized information to all recipients with a click of a button.</p>
          <button
            className="homepage-button"
            route="createCallsheet"
            onClick={this.props.changeRoute}>START</button>
        </section>
        <section className="distro-section">
          <h1>DISTRO</h1>
          <p>Filter through all crew members by name, department, or distro group. Sending emails to single users or entire departments has never been simpler</p>
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
