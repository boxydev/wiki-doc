import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './welcome'
import Page from './page'

var isBrowser = typeof window !== 'undefined'

class App extends React.Component {
    navigate(event) {
      event.preventDefault()
      window.history.pushState(null, null, event.currentTarget.pathname)
    }

    render() {
        var title = 'Site';
        var el = Page;
        return (
            <div>
                {React.createElement(el, {html: this.props.html})}
                <Welcome name="Matthieu" />
                <Welcome name="Marina" />
            </div>
        )
    }
}

if (isBrowser) {
    ReactDOM.render(<App />, document.getElementById('app'))
} else {
    module.exports = App
}
