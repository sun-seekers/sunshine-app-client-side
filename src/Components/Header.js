import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { setToLocalStorage } from '../LocalStorageUtils'

export default class Header extends Component {
    handleLogOut = () => {
        setToLocalStorage('')
        window.location.reload()
    }
        
    render() {
        return (
            <header>
                <div className="header-container">
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
               </div>
            </header>
        )
    }
}
