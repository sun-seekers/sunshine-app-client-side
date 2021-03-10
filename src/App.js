import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Components/Header.js';
import HomePage from './HomePage/HomePage.js';
import AuthPage from './AuthPage/AuthPage.js';
import SearchPage from './SearchPage/SearchPage.js';
import DetailsPage from './DetailsPage/DetailsPage.js';
import AboutPage from './AboutPage/AboutPage.js';
import TripsPage from './TripsPage/TripsPage.js';
import PrivateRoute from './Components/PrivateRoute.js';
import { getUserFromStorage } from './LocalStorageUtils.js';

export default class App extends Component {
  state = {
    token: getUserFromStorage().token

  }
  handleToken = (token) => {
    this.setState({ token });
  }


  render() {
    const {
      token,

    } = this.state
    console.log('token:', token);
    return (
      <div>
        <Router>
          <Header token={token} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <HomePage {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => <AuthPage token={token} handleToken={this.handleToken} {...routerProps} />}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) => <AuthPage token={token} handleToken={this.handleToken} {...routerProps} />}
            />
            <Route
              path="/about"
              exact
              render={(routerProps) => <AboutPage token={token} {...routerProps} />}
            />

            <PrivateRoute
              path="/search"
              exact
              token={token}
              render={(routerProps) => <SearchPage token={token} {...routerProps} />}
            />
            <PrivateRoute
              path="/search/:city"
              exact
              token={token}
              render={(routerProps) => <DetailsPage {...routerProps} />}
            />
            <PrivateRoute
              path="/trips"
              exact
              token={token}
              render={(routerProps) => <TripsPage {...routerProps} />}
            />
          </Switch>
        </Router>

      </div>
    )
  }
}

