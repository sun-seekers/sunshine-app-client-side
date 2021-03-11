import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { addATrip } from '../ApiUtils.js';
import DetailComponent from './DetailComponent.js';

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

        }, this.props.token)
    }

    render() {
        console.log('state', this.state.location, 'props', this.props.locations);
        return (
            <main>
                <div className="details-con">

                    <Link to='/search'>Back to search</Link>
                    <DetailComponent location={this.state.location} handleTripAdd={this.handleTripAdd} />
                </div>
            </main>
        )
    }
}
