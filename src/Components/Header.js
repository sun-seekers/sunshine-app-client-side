import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <header>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                {
                    this.props.token && <>
                        <NavLink to='/search'>Search</NavLink>
                        <NavLink to='/trips'>Trips</NavLink>
                    </>
                }
                {
                    !this.props.token && <>
                        <NavLink to='/signup'>Sign Up</NavLink>
                        <NavLink to='/login'>Log In</NavLink>
                    </>
                }

            </header>

        )
    }
}
