import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './welcome'
import Page from './page'

class App extends React.Component {
    render() {
        var title = this.props.meta.title
        var url = this.props.url
        var el = Page
        return (
            <html lang="fr">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>{ title }</title>
                    <link rel="stylesheet" href="css/main.css" />
                </head>
                <body>
                    { React.createElement(el, {html: this.props.html, url: this.props.url}) }
                    <Welcome name="Matthieu" />
                    <Welcome name="Marina" />
                    <script src="js/app.js"></script>
                </body>
            </html>
        )
    }
}

module.exports = App
