import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default class SearchComponent extends Component {
    render() {
        const {
            locations,
            hawaii,
            sortBy
        } = this.props;
        return (
            <div className='search-results-container' >
                { locations !== []
                    && locations
                        .slice(0, 9)
                        .map(location =>
                        <Link
                            key={location.zip_code}
                            className='search-location'
                            to={`/details/${location.zip_code}`} >
                            <div>
                                <h3>
                                    {location.city}, {location.state}
                                </h3>
                                {sortBy === 'clouds'
                                && <p className='sort-by'>
                                    {location.clouds}% cloud cover
                                </p>
                                }
                                {sortBy === 'temperature'
                                && <p className='sort-by'>
                                    {location.temperature}° F
                                </p>
                                }
                                {sortBy === 'distance'
                                && <p className='sort-by'>
                                    {location.distance} miles away
                                </p>
                                }
                            </div>
                        </Link>
                    )
                }
                { hawaii === true
                    && <div className="no-results">
                        No results found - try widening your search or...
                            <a href='https://www.expedia.com/Hotel-Search?packageType=fh&searchProduct=hotel&c=b396b3b9-8ad0-45cb-a2a2-737609c47c9e&adults=2&origin=Portland,+OR,+United+States+of+America+(PDX-Portland+Intl.)&originId=5784656&ftla=PDX&regionId=213&destination=Hawaii,+United+States+of+America&destinationId=213&ttla=HNL&startDate=2021-06-07&endDate=2021-06-14&sort=recommended&tripType=ROUND_TRIP&cabinClass=COACH&misId=AgiIkvnj7Jba9h0QpL-Ntd-6rfqpASDXgv4g~ARIEGgIIAhowCAESFgoDUERYGNCI4QIqCjIwMjEtMDYtMDcSFAoDSE5MGNUBKgoyMDIxLTA2LTE0'
                            target='_blank'
                            rel="noreferrer"
                            >
                            <img src="http://placekitten.com/200" alt="tropical destination" className="hawaii" />
                        Click here!
                        </a>
                    </div>
                }
            </div>
        )
    }
}
