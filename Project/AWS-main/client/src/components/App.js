import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

  componentDidMount() {
    // after the mount, call the action creater
    this.props.fetchUser();
  }

  render() {
    return (
        <BrowserRouter>
          {/* using the className to call the materialize-css */}
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Footer />
          </div>
        </BrowserRouter>
    );
  };
}

// load all actions to redux
// and make them as props of the component
export default connect(null, actions)(App);
