import React, { Component } from 'react'

export default class Spinner extends Component {
    render() {
        return (
            <img
                src='https://cdn.dribbble.com/users/8563/screenshots/485890/loading-icon.gif'
                alt='spinner'
                className='spinner'
            />
        )
    }
}
