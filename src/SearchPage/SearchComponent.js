import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchComponent extends Component {
    render() {
        return (
            <>
                {

                    this.props.locations.map(location =>
                        <Link className='link-style' to={`/search/${location.city}`}>
                            <div className='search-location' >
                                <h3>{location.city}, {location.state}</h3>
                                <p>Cloud cover: {location.clouds}%</p>
                                <p>{location.temperature}° F </p>
                                <p>Distance: {location.distance} miles*</p>
                                <button>Add to trips</button>
                            </div>
                        </Link>
                    )
                }


            </>
        )
    }
}
