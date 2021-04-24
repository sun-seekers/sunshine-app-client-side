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
        
        // lots of parameters here! at this point, i like to pass an object with keys in, otherwise it gets annoying to remember what the order of arguments is every time
        const locations = await getWeatherRadius(zipcode, distance, this.props.token, sortBy, order, day);

        if (!locations.length) this.setState({ hawaii: true })

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
        
        await this.searchLocations(this.state.sortBy === 'temperature' ? 'desc' : 'asc') 
       
        this.setState({ loading: false })
    }

    weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    {/* i'm not a module expert, but i think this should let you run through the array multiple times */}
    getDay = num => day.getDay() + 1 % this.weekdays.length

    render() {
        const day = new Date();
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
                        {
                            [50, 75, 100, 125, 150].map(num => 
                                <option value={num}>
                                    {num} miles
                                </option>)
                        }
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
                        {
                        [1,2,3,4,5,6]
                            .map(num => 
                            <option value={num}>
                                {weekdays[this.getDay(num)]}
                            </option>)
                        }
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
