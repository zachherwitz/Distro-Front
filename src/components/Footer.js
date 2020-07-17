import React from 'react';

class Footer extends React.Component {
  render = () => {
    return <footer style={{background:this.props.navColor}}>
      <h1>This is my Footer</h1>
    </footer>
  }
}

export default Footer
