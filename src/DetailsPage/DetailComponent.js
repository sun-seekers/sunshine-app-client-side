import React, { Component } from 'react'

export default class DetailComponent extends Component {
    render() {
        const {
            city,
            state,
            forecast,
        } = this.props.location;
        console.log(this.props.location.city)
        return (
            <>
                <h3>{city}, {state}</h3>
                <p>Forecast: {forecast}</p>
                <button onClick={() => this.props.handleTripAdd(this.props.location)}>Add To Trips!</button>


            </>
        )
    }
}
