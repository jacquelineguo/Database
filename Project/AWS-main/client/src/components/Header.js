import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import axios from 'axios';

class Header extends Component {
  // according to the result of auth function, show different contents
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/surveys" onClick={login}>Login</a></li>
        );
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="2" style={{margin: '0 10px'}}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper green">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
              &nbsp;Emaily
          </Link>
          <ul className="right">
            { this.renderContent() }
          </ul>
        </div>
      </nav>
    );
  }
}

// add the auth function of reducers in state as one of props in the Component
function mapStateToProps({ auth }) {
  return { auth };
}

function login() {
  fetch("/auth/google", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "PASSWORD",
      username: "MY_USERNAME",
      password: "MY_PASSWORD"
    })
  })
    .then(data => console.log(data))  // ur data is here
    .catch(err => console.log("api Erorr: ", err));

}

export default connect(mapStateToProps)(Header);