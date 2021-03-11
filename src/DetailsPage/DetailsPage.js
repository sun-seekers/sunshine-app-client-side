import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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

    render() {
        console.log('state', this.state.location, 'props', this.props.locations);
        return (
            <main>
                <div className="details-con">

                <Link to='/search'>Back to search</Link>
                </div>
            </main>
        )
    }
}
