import React, { Component } from 'react'
import { logInUser, signUpUser } from '../ApiUtils.js';
import { setToLocalStorage } from '../LocalStorageUtils.js';
import AuthForm from './AuthForm.js';

export default class AuthPage extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    handleNameChange = e => this.setState({ name: e.target.value });
    handleEmailChange = e => this.setState({ email: e.target.value });
    handlePasswordChange = e => this.setState({ password: e.target.value });
    handleSubmit = async e => {
        e.preventDefault();
        const {
            name,
            email,
            password
        } = this.state;
        if (this.props.history.location.pathname === '/signup') {
            const user = await signUpUser(name, email, password);
            console.log(user);
            setToLocalStorage(user);
            this.props.handleToken(user.token);
            this.props.history.push('/search');
        } else {
            const user = await logInUser(email, password);
            // setToLocalStorage(user);
            this.props.handleToken(user.token);
            this.props.history.push('/search');
        }




    }
    render() {
        const {
            name,
            email,
            password,
        } = this.state;
        return (
            <main>
                <AuthForm
                    renderName={this.props.history.location.pathname === '/signup'}
                    name={name}
                    email={email}
                    password={password}
                    handleNameChange={this.handleNameChange}
                    handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleSubmit={this.handleSubmit}
                />


            </main>
        )
    }
}
