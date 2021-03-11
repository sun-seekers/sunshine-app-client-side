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
import AboutPage from './AboutPage/AboutPage.js';
import TripsPage from './TripsPage/TripsPage.js';
import PrivateRoute from './Components/PrivateRoute.js';
import DetailsPage from './DetailsPage/DetailsPage';
import { getUserFromStorage } from './LocalStorageUtils.js';

export default class App extends Component {
  state = {
    token: getUserFromStorage().token,
    locations: []
  }
  handleToken = (token) => {
    this.setState({ token });
  }

  handleLocations = (locations) => this.setState({ locations })

  render() {
    console.log(this.state.locations);
    const {
      token,
      locations
    } = this.state
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
              render={(routerProps) => <SearchPage token={token} {...routerProps} locations={locations} handleLocations={this.handleLocations} />}
            />
            <PrivateRoute
              path="/details/:zip"
              exact
              token={token}
              render={(routerProps) => <DetailsPage {...routerProps} locations={locations}/>}
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

