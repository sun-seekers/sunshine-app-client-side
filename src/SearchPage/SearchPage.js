import React, { Component } from 'react'
import { getWeatherRadius } from '../ApiUtils.js';
import SearchComponent from './SearchComponent.js';

export default class SearchPage extends Component {
    state = {
        locations: [],
        zipcode: '',
        distance: 50,
        sortBy: 'clouds',
        order: 'asc',
        day: 0
    }
    searchLocations = async () => {
        const {
            zipcode,
            distance,
            sortBy,
            order,
            day
        } = this.state;
        const locations = await getWeatherRadius(zipcode, distance, this.props.token, sortBy, order, day);
        this.setState({ locations });

        console.log(this.state.locations);
    }
    handleSortChange = e => this.setState({ sortBy: e.target.value });
    handleZipcodeChange = e => this.setState({ zipcode: e.target.value });
    handleDistanceChange = e => this.setState({ distance: e.target.value });
    handleSubmitChange = async e => {
        e.preventDefault();
        await this.searchLocations();
    }




    render() {
        console.log(this.state.sortBy);
        return (
            <main>
                <form onSubmit={this.handleSubmitChange}>
                    <input placeholder='Your Zipcode' required onChange={this.handleZipcodeChange} />
                    <select onChange={this.handleDistanceChange}>
                        <option value={50}>50 miles</option>
                        <option value={100}>100 miles</option>
                        <option value={150}>150 miles</option>
                    </select>
                    <select onChange={this.handleSortChange}>
                        <option value={'clouds'}>clouds</option>
                        <option value={'temperature'}>Temperature</option>
                        <option value={'distance'}>Distance</option>
                    </select>

                    <button>Search!</button>
                </form>
                <div className='search-field'>
                    <SearchComponent locations={this.state.locations} />
                </div>


            </main >
        )
    }
}
