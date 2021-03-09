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
            <main> {
                name && <>
                    <h3>welcome Back, {name}!</h3>
                    <button onClick={this.handleSearchClick}>Find Some Sun</button>
                </>
            }
                {
                    !name && <>
                        <button onClick={this.handleHomeClick}>Sign Up!</button>
                        <Link to={'/login'}>Already signed up? Log In!</Link>
                    </>
                }

            </main>
        )
    }
}
