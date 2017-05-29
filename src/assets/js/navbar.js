import React from 'react'

class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="wrap">
                    <ul className="nav-list">
                        <li><a className={this.props.url === '/index.html' ? 'active' : ''} href="./index.html">Accueil</a></li>
                        <li><a className={this.props.url === '/about.html' ? 'active' : ''} href="./about.html">A propos</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

module.exports = Navbar