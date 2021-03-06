import React, { Component } from 'react'
import { getWeatherRadius } from '../ApiUtils.js';
import SearchComponent from './SearchComponent.js';
import Spinner from '../Components/Spinner.js';
import '../App.css';

export default class SearchPage extends Component {
    state = {
        zipcode: '',
        distance: 49,
        sortBy: 'asc',
        day: 0,
        current_zip: this.props.match.params.zip,
        loading: false,
        hawaii: false,
        display: false
    }

    searchLocations = async (order) => {
        const {
            zipcode,
            distance,
            sortBy,
            day,
        } = this.state;

        this.setState({ hawaii: false, display: true })
        
        const locations = await getWeatherRadius(zipcode, distance, this.props.token, sortBy, order, day);

        if (locations.length === 0) this.setState({ hawaii: true })

        this.props.handleLocations(locations);
    }

    handleSortChange = e => {
        this.setState({ sortBy: e.target.value }); 
    }

    handleZipcodeChange = e => this.setState({ zipcode: e.target.value });

    handleDistanceChange = e => this.setState({ distance: e.target.value });

    handleDateChange = e => this.setState({ day: e.target.value });

    handleSubmitChange = async e => {
        e.preventDefault();
        
        this.setState({ loading: true })
        
        this.state.sortBy === 'temperature' ? await this.searchLocations('desc') : await this.searchLocations('asc');
       
        this.setState({ loading: false })
    }

    render() {
        const day = new Date();
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const {
            loading,
            distance,
            hawaii,
            sortBy,
            zipcode,
            display
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
                        <option value={49}>Distance</option>
                        <option value={50}>50 miles</option>
                        <option value={75}>75 miles</option>
                        <option value={100}>100 miles</option>
                        <option value={125}>125 miles</option>
                        <option value={150}>150 miles</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={this.handleSortChange} >
                        <option value={''}>Sort by</option>
                        <option value={'clouds'}>Clouds</option>
                        <option value={'temperature'}>Temperature</option>
                        <option value={'distance'}>Distance</option>
                    </select>
                    <select
                        value={this.state.day}
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
                {loading === false
                    && display === true
                    && <SearchComponent
                        locations={this.props.locations}
                        hawaii={hawaii}
                        sortBy={sortBy} />
                }
            </main >

        )
    }
}
