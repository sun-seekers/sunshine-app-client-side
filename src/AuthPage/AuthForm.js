import React, { Component } from 'react'

export default class AuthForm extends Component {
    render() {
        const {
            handleSubmit,
            name,
            handleNameChange,
            email,
            handleEmailChange,
            password,
            handlePasswordChange,
            renderName
        } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                { renderName &&
                    <input placeholder="Name" value={name} onChange={handleNameChange} />
                }
                <input placeholder="email" value={email} onChange={handleEmailChange} />
                <input placeholder="password" value={password} type='password' onChange={handlePasswordChange} />
                <button>Submit</button>
            </form>
        )
    }
}
