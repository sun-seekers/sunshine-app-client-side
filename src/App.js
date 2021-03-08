import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './components/Header.js';
import HomePage from './HomePage/HomePage';
import AuthPage from './AuthPage/AuthPage';
import SearchPage from './searchPage/SearchPage';
import DetailsPage from './DetailsPage/DetailsPage';
import AboutPage from './AboutPage/AboutPage';
import TripsPage from './TripsPage/TripsPage.js';
import PrivateRoute from './Components/PrivateRoute.js';
import { getUserFromStorage } from './LocalStorageUtils.js';

export default class App extends Component {
  state = {
    token: getUserFromStorage().token,
  }

  render() {
    const {
      token,

    } = this.state
    return (
      <main>
        <Router>
          <Header token={token} handleLogOut={this.handleLogOut} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <HomePage {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => <AuthPage token={token} {...routerProps} />}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) => <AuthPage token={token} {...routerProps} />}
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
              render={(routerProps) => <SearchPage {...routerProps} />}
            />
            <PrivateRoute
              path="/search/:id"
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

      </main>
    )
  }
}

