import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getUserFromStorage } from '../LocalStorageUtils.js';

export default class HomePage extends Component {
    state = {
        name: getUserFromStorage().name
    }

    handleHomeClick = () => this.props.history.push('/signup');
    
    handleSearchClick = () => this.props.history.push('/search');

    render() {
        const {
            name
        } = this.state;
        return (
            <main>
                <h1>Better Weather</h1>
                {
                    name
                    && <>
                        <h3>Welcome back, {name}!</h3>
                    </>
                }
                {
                    !name && <div className="welcome">
                        <p>Have you ever looked outside and thought to yourself, “I wish the weather was better”? Well, look no future! This is Better Weather, the app that helps you find better weather that is only a drive away. </p>
                        <p>Better Weather uses your zip code and a distance to create a radius around you and search for better weather. Our search options allow you to filter and sort for weather based on cloud coverage*, distance*, or temperature*. Start your search with 50 miles and expand your radius if needed. If you’re unable to find a location it might be the wrong time of year or you might want to consider moving closer to the equator. </p>
                        <p>If you are craving a clear sky, warm temperature, and the sun, Better Weather is for you!</p>
                        <p className='disclosure'>*Search results have 50% or less cloud coverage.</p>
                        <p className='disclosure'>*Distance results are a straight line; driving time will vary. </p>
                        <p className='disclosure'>*Search distance uses the last 25 miles of the radius you set.</p>
                    </div>
                }
                {!name
                    && <>
                        <button onClick={this.handleHomeClick}>Sign Up!</button>
                        <Link to={'/login'}>Already signed up? Log In!</Link>
                    </>
                }
            </main>
        )
    }
}
