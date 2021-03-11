import React, { Component } from 'react'
import { getWeatherRadius } from '../ApiUtils.js';
import SearchComponent from './SearchComponent.js';
import Spinner from '../Components/Spinner.js';
import '../App.css';

export default class SearchPage extends Component {
    state = {
        locations: this.props.locations,
        zipcode: '',
        distance: 50,
        sortBy: 'clouds',
        order: 'asc',
        day: 0,
        current_zip: this.props.match.params.zip,
        loading: false,
        hawaii: false
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

        this.setState({ hawaii: true })

        this.props.handleLocations(locations);
    }

    handleSortChange = e => this.setState({ sortBy: e.target.value });

    handleZipcodeChange = e => this.setState({ zipcode: e.target.value });

    handleDistanceChange = e => this.setState({ distance: e.target.value });

    handleDateChange = e => this.setState({ day: e.target.value });

    handleSubmitChange = async e => {
        e.preventDefault();

        this.setState({ loading: true })

        await this.searchLocations();

        this.setState({ loading: false })
    }

    render() {
        const day = new Date();
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const {
            loading,
            distance,
            locations,
            hawaii,
            sortBy,
            zipcode
        } = this.state
        return (
            <main>
                <form onSubmit={this.handleSubmitChange}>
                    <input
                        value={zipcode}
                        placeholder='Enter Your Zipcode'
                        required onChange={this.handleZipcodeChange} />
                    <select
                        value={distance}
                        onChange={this.handleDistanceChange} >
                        <option value={50}>Distance</option>
                        <option value={50}>50 miles</option>
                        <option value={75}>75 miles</option>
                        <option value={100}>100 miles</option>
                        <option value={125}>100 miles</option>
                        <option value={150}>150 miles</option>
                        <option value={175}>175 miles</option>
                        <option value={200}>200 miles</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={this.handleSortChange} >
                        <option value={'clouds'}>Select</option>
                        <option value={'clouds'}>clouds</option>
                        <option value={'temperature'}>temperature</option>
                        <option value={'distance'}>distance</option>
                    </select>
                    <select
                        value={day}
                        onChange={this.handleDateChange} >
                        <option value={0}>Today</option>
                        <option value={1}>{weekdays[day.getDay() + 1]}</option>
                        <option value={2}>{weekdays[day.getDay() + 2]}</option>
                        <option value={3}>{weekdays[day.getDay() + 3]}</option>
                        <option value={4}>{weekdays[day.getDay() + 4]}</option>
                        <option value={5}>{weekdays[day.getDay() + 5]}</option>
                        <option value={6}>{weekdays[day.getDay() + 6]}</option>
                    </select>
                    <button>Find Better Weather!</button>
                </form>
                {loading === true
                    && <Spinner />
                }
                {loading === false && locations.length !== 0
                    && <SearchComponent
                        locations={locations}
                        hawaii={hawaii}
                        sortBy={sortBy} />
                }
            </main >

        )
    }
}
