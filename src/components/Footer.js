import React from 'react';

class Footer extends React.Component {
  render = () => {
    return <footer>
      <div className="footer-container">
        <h1>d|STRO created by zach herwitz</h1>
        <div className="socials">
          <a
            target="_blank"
            href="https://github.com/zachherwitz/">
            <i className="fab fa-2x fa-github"></i>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/zach-herwitz/">
            <i class="fab fa-2x fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  }
}

export default Footer
