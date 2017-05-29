import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Navbar from './navbar'
import Page from './page'
import Footer from './footer'

class App extends React.Component {
    render() {
        var title = this.props.meta.title
        var baseUrl = this.props.baseUrl
        var url = this.props.url
        var html = this.props.html
        var sourceUrl = this.props.sourceUrl
        var el = Page
        return (
            <html lang="fr">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>{ title } - WikiDoc</title>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/darcula.min.css" />
                    <link rel="stylesheet" href={ baseUrl + 'css/main.css' } />
                </head>
                <body>
                    <Navbar baseUrl={ baseUrl } url={ url } />
                    { React.createElement(el, { html: html, sourceUrl: sourceUrl }) }
                    <Footer />
                    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"></script>
                    <script>hljs.initHighlightingOnLoad();</script>
                    <script src={ baseUrl + 'js/app.js' }></script>
                </body>
            </html>
        )
    }
}

module.exports = function createReactApp(props) {
    return ReactDOMServer.renderToStaticMarkup(React.createElement(App, props))
}
