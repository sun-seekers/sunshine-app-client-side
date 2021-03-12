import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { setToLocalStorage } from '../LocalStorageUtils'

export default class Header extends Component {
    handleLogOut = () => setToLocalStorage('')
        
    render() {
        return (
            <header>
                 <NavLink
                    to="/about"
                    activeClassName='hidden' >
                    About
                </NavLink>
                <NavLink
                    to="/"
                    exact
                    activeClassName='hidden' >
                    Home
                </NavLink>
                {
                    this.props.token && <>
                        <NavLink
                            to='/search'>
                            Search
                        </NavLink>
                        <NavLink
                            to='/trips'>
                            Trips
                        </NavLink>
                        <NavLink
                            onClick={this.handleLogOut}
                            activeClassName='hidden'
                            to="/login">
                            Log Out
                        </NavLink>
                    </>
                }
                {/* {
                     !this.props.token && <>
                        <NavLink
                            to='/signup'
                            activeClassName='hidden' >
                            Sign Up
                            </NavLink>
                        <NavLink
                            to='/login'
                            activeClassName='hidden' >
                            Log In
                        </NavLink>
                    </>
                } */}
               
            </header>

        )
    }
}
