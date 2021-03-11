import React, { Component } from 'react'
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { addATrip } from '../ApiUtils.js';
import DetailComponent from './DetailComponent.js';
=======
>>>>>>> be9e40ee9663a1da89b9e1d8e4f6f4638f41664e

export default class DetailsPage extends Component {
    state = {
        locations: this.props.locations,
        location: {}
    }
    componentDidMount = async () => {
        console.log(this.state);
        const location = this.state.locations.find(location => location.zip_code === this.props.match.params.zip)
        this.setState({ location })
    }
    handleTripAdd = async (location) => {
        await addATrip({
            city: location.city,
            distance: location.distance,
            state: location.state,
            zip_code: location.zip_code,

<<<<<<< HEAD
        }, this.props.token)
    }

=======
>>>>>>> be9e40ee9663a1da89b9e1d8e4f6f4638f41664e
    render() {
        console.log('state', this.state.location, 'props', this.props.locations);
        return (
            <main>
                <div className="details-con">
<<<<<<< HEAD

                    <Link to='/search'>Back to search</Link>
                    <DetailComponent location={this.state.location} handleTripAdd={this.handleTripAdd} />
=======
                    <p>Location:{this.state.location.city}, {this.state.location.state}</p>
                    <p>Cloud Cover:{this.state.location.clouds}%</p>
                    <p>Date:{this.state.location.date}</p>
                    <p>Distance:{this.state.location.distance} miles</p>
                    <p>Forecast:{this.state.location.forecast}</p>
                    <p>Temperature:{this.state.location.temperature}° F</p>
                    

                <Link to='/search'>Back to search</Link>
>>>>>>> be9e40ee9663a1da89b9e1d8e4f6f4638f41664e
                </div>
            </main>
        )
    }
}
