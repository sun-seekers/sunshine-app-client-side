import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { addATrip } from '../ApiUtils.js';


export default class DetailsPage extends Component {
    state = {
        locations: this.props.locations,
        location: {},
        trips: []
    }
    componentDidMount = async () => {
        const location = this.state.locations.find(location => location.zip_code === this.props.match.params.zip)
        this.setState({ location })

        await this.isATrip();
    }

    handleTripAdd = async (location) => {
        await addATrip({
            city: location.city,
            distance: location.distance,
            state: location.state,
            visited: false,
            zip_code: Number(location.zip_code),
        }, this.props.token)
        window.location.reload();
    }

    isATrip = (location) => {
        if (!this.props.token) return true;
        const isTrip = this.state.trips.find(trip => trip.zip_code === location.zip_code);
        return (isTrip);
    }
    
    render() {
        return (
            <main>
                <div className="details-con">
                
                    <p>Location:{this.state.location.city}, {this.state.location.state}</p>
                    <p>Cloud Cover: {this.state.location.clouds}%</p>
                    <p>Date: {this.state.location.date}</p>
                    <p>Distance: {this.state.location.distance} miles</p>
                    <p>Forecast: {this.state.location.forecast}</p>
                    <p>Temperature: {this.state.location.temperature}° F</p>
                    <p>{this.isATrip(this.state.location)
                    ? '☀️'
                    : <button onClick={() => this.handleTripAdd(this.state.location)}>Add To Trips!</button>}</p>

                    <Link to='/search'>Back to search</Link>
                </div>
            </main>
        )
    }
}

