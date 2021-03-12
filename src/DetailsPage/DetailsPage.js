import React, { Component } from 'react'
import { addATrip, deleteTrip, getFaveTrips, haveVisited } from '../ApiUtils.js';

export default class DetailsPage extends Component {
    state = {
        locations: this.props.locations,
        location: {},
        trips: []
    }

    componentDidMount = async () => {
        const location = this.state.locations.find(location => location.zip_code === this.props.match.params.zip);
        this.setState({ location });
        await this.fetchTrips();
        await this.isATrip(location);
    }

    fetchTrips = async () => {
        const trips = await getFaveTrips(this.props.token)
        this.setState({ trips: trips })
    }

    handleTripAdd = async (location) => {
        await addATrip({
            city: location.city,
            distance: location.distance,
            state: location.state,
            visited: false,
            zip_code: Number(location.zip_code),
        }, this.props.token)
        await this.fetchTrips()
    }

    isATrip = (location) => {
        const isTrip = this.state.trips.find(trip => trip.zip_code === Number(location.zip_code));
        return Boolean(isTrip);
    }

    haveVisited = async (location) => {
         const isVisit = await this.state.trips.filter(trip => trip.zip_code === Number(location.zip_code));
        return isVisit;
    }

    handleDelete = async (zipCode) => {
        await deleteTrip(zipCode, this.props.token)
        this.props.history.push('/search')
    }

    handleVisited = async (zipCode) => {
        await haveVisited(zipCode, this.props.token)
        await deleteTrip(zipCode, this.props.token)
        this.props.history.push('/search')
    }

    render() {
        const { location } = this.state
        return (
            <main>
                    <div className="details-con">
                        <h3>
                            {location.city}, {location.state}
                        </h3>
                        <p>
                            {location.date}
                        </p>
                        <p>
                            {location.temperature}° F
                        </p>
                        <p>
                            {location.forecast} ({location.clouds}% cloud cover)
                    </p>
                        <p>
                            Approx. {location.distance} miles away
                        </p>
                    </div>
                    {this.isATrip(location)
                        ? <button
                            onClick={() => this.handleDelete(location.zip_code)}>
                            Remove Trip
                            </button>
                        : <button
                            onClick={() => this.handleTripAdd(location)}>
                            Add Trip
                            </button>
                    }
                {this.isATrip(location)
                    && this.haveVisited(location)
                        && <button
                            onClick={() => this.handleVisited(location.zip_code)}>
                            I went!
                        </button>
                    }
            </main>
        )
    }
}
