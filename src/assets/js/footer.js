import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="wrap">
                    Copyright © {new Date().getFullYear()} Boxydev Inc.
                </div>
            </footer>
        )
    }
}

module.exports = Footer
