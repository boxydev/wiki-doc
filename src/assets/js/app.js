import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './welcome'
import Page from './page'

class App extends React.Component {
    render() {
        var title = 'Site'
        var el = Page
        return (
            <div>
                { React.createElement(el, {html: this.props.html}) }
                <Welcome name="Matthieu" />
                <Welcome name="Marina" />
            </div>
        )
    }
}

module.exports = App
