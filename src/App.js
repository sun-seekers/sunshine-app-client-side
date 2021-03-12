import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './Components/Header.js';
import HomePage from './HomePage/HomePage.js';
import AuthPage from './AuthPage/AuthPage.js';
import SearchPage from './SearchPage/SearchPage.js';
import AboutPage from './AboutPage/AboutPage.js';
import TripsPage from './TripsPage/TripsPage.js';
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
    const {
      token,
      locations
    } = this.state
    return (
      <div className='App'>
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
            <Route 
                exact
                path='/search' 
                render={
                  (routerProps) =>
                  token 
                      ? <SearchPage
                        token={token}
                        locations={locations}
                        handleLocations={this.handleLocations}
                        {...routerProps} />
                    : <Redirect to="/" />
                  } 
            />
            <Route 
                exact
                path="/details/:zip"
                render={
                  (routerProps) =>
                  token 
                      ? <DetailsPage
                        token={token}
                        locations={locations}
                        {...routerProps} />
                    : <Redirect to="/" />
                  } 
            />
            <Route 
                exact
                path="/trips"
                render={
                  (routerProps) =>
                  token 
                      ? <TripsPage
                        token={token}
                        {...routerProps} />
                    : <Redirect to="/" />
                  } 
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

