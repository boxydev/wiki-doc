import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <footer className="wrap">
                Copyright © {new Date().getFullYear()} Boxydev Inc.
            </footer>
        )
    }
}

module.exports = Footer