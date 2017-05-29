import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './navbar'
import Page from './page'
import Footer from './footer'

class App extends React.Component {
    render() {
        var title = this.props.meta.title
        var url = this.props.url
        var sourceUrl = this.props.sourceUrl
        var el = Page
        return (
            <html lang="fr">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>{ title }</title>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/default.min.css" />
                    <link rel="stylesheet" href="css/main.css" />
                </head>
                <body>
                    <Navbar url={this.props.url} />
                    { React.createElement(el, {html: this.props.html, url: this.props.sourceUrl}) }
                    <Footer />
                    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"></script>
                    <script>hljs.initHighlightingOnLoad();</script>
                    <script src="js/app.js"></script>
                </body>
            </html>
        )
    }
}

module.exports = App
