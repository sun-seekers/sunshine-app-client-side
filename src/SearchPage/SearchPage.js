import React, { Component } from 'react'

export default class SearchPage extends Component {
    render() {
        return (
            <main>
                <input placeholder='Your Location' />
                <select>
                    <option value={50}>50 miles</option>
                    <option value={100}>100 miles</option>
                    <option value={150}>150 miles</option>
                </select>

            </main>
        )
    }
}
