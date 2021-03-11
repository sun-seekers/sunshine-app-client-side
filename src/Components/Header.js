import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <header>
                <NavLink
                    to="/"
                    exact
                    activeClassName='hidden' >
                    Home
                </NavLink>
                {
                    this.props.token && <>
                        <NavLink to='/search'>Search</NavLink>
                        <NavLink to='/trips'>Trips</NavLink>
                    </>
                }
                {
                    !this.props.token && <>
                        <NavLink
                            to='/signup'
                            activeClassName='hidden' >
                            Sign Up
                            </NavLink>
                        <NavLink to='/login'>Log In</NavLink>
                    </>
                }
                <NavLink
                    to="/about"
                    activeClassName='hidden' >
                    About
                </NavLink>
                <NavLink
                    onClick={this.handleLogOut}
                    to="/login">
                    Log Out
                </NavLink>
            </header>

        )
    }
}
