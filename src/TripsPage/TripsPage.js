import React, { Component } from 'react'
import { getFaveTrips } from '../ApiUtils.js'
import SearchComponent from '../SearchPage/SearchComponent.js'

export default class TripsPage extends Component {
    state = {
        trips: []
    }
    componentDidMount = async () => {
        await this.getTrips()
    }

    getTrips = async () => {
        const trips = await getFaveTrips(this.props.token);
        this.setState({ trips });
    }
    render() {
        return (
            <main>
                <SearchComponent locations={this.state.trips} />
                <button onClick={() => this.handleTripAdd(this.state.location)}>Remove Trip</button>

            </main>
        )
    }
}
