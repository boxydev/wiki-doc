import React from 'react'

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: props.name }
    }

    reverse() {
        this.setState(() => ({ name: (this.state.name === 'Matthieu') ? 'Marina' : 'Matthieu' }))
    }

    render() {
        return (
            <nav>
                <h1>Hello, {this.state.name}</h1>
                <button onClick={(e) => this.reverse(e)}>Reverse name</button>
            </nav>
        )
    }
}

module.exports = Welcome