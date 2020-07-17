import React from 'react';

class Navigation extends React.Component {
  render = () => {
    return (
      <nav style={{display: 'flex', justifyContent: 'space-around', paddingTop: '20px'}}>
        <button onClick={this.props.changeRoute} route="allUsers">
          All Users View
        </button>
        <button onClick={this.props.changeRoute} route="createCallsheet">
          Call Sheet View
        </button>
      </nav>
  )}
}

export default Navigation
