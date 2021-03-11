import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchComponent extends Component {
    render() {
        console.log(this.props.hawaii);
        return (
            <>
                { this.props.locations !== []
                    && this.props.locations.map(location =>
                        <Link key={location.zip_code} className='link-style' to={`/details/${location.zip_code}`}>
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
                {   this.props.hawaii === true
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
            </>
        )
    }
}
