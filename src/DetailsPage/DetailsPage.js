import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { addATrip, deleteTrip, getFaveTrips } from '../ApiUtils.js';


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
        // if (!this.props.token) return true;

        const isTrip = this.state.trips.find(trip => trip.zip_code === Number(location.zip_code));
        return Boolean(isTrip);
    }
    handleDelete = async (zipCode) => {
        await deleteTrip(zipCode, this.props.token)
        this.props.history.push('/search')

    }

    render() {
        console.log(this.state.trips)
        console.log(this.state.location)
        return (
            <main>
                {/* <Link to='/search'>Back to search</Link> */}
                <div className="details-con">

                    <h3>{this.state.location.city}, {this.state.location.state}</h3>
                    <p>{this.state.location.date}</p>
                    <p>{this.state.location.temperature}° F</p>
                    <p>{this.state.location.forecast} ({this.state.location.clouds}% cloud cover)</p>

                    <p>Approx. {this.state.location.distance} miles away</p>
                    <p>{this.isATrip(this.state.location)
                        ? <button onClick={() => this.handleDelete(this.state.location.zip_code)}>Remove Trip</button>
                        : <button onClick={() => this.handleTripAdd(this.state.location)}>Add Trip</button>}</p>


                </div>
            </main>
        )
    }
}

