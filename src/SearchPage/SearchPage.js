import React, { Component } from 'react'
import { getWeatherRadius } from '../ApiUtils.js';

export default class SearchPage extends Component {
    state = {
        locations: [],
        zipcode: '',
        distance: 50
    }
    searchLocations = async () => {
        const locations = await getWeatherRadius(this.state.zipcode, this.state.distance, this.props.token);
        this.setState({ locations });
    }

    handleZipcodeChange = e => this.setState({ zipcode: e.target.value });
    handleDropdownChange = e => this.setState({ distance: e.target.value });
    handleSubmitChange = async e => {
        e.preventDefault();
        await this.searchLocations();
    }



    render() {
        return (
            <main>
                <form onSubmit={this.handleSubmitChange}>
                    <input placeholder='Your Zipcode' onChange={this.handleZipcodeChange} />
                    <select onChange={this.handleDropdownChange}>
                        <option value={2}>2 miles</option>
                        <option value={50}>50 miles</option>
                        <option value={100}>100 miles</option>
                        <option value={150}>150 miles</option>
                    </select>
                    <button>Search!</button>
                </form>
                <div>
                    {
                        this.state.locations.map(location =>
                            <p>{location.city}</p>)
                    }
                </div>


            </main>
        )
    }
}
