import React from 'react'

class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="wrap">
                    <a className="nav-home" href="./index.html">
                        <img className="nav-logo" src="http://www.boxydev.com/img/logo.png" alt="WikiDoc" />
                        &nbsp;&nbsp;WikiDoc
                    </a>
                    <div className="nav-list">
                        <ul className="nav-left">
                            <li><a className={this.props.url === '/index.html' ? 'active' : ''} href="./index.html">Accueil</a></li>
                            <li><a className={this.props.url === '/about.html' ? 'active' : ''} href="./about.html">A propos</a></li>
                        </ul>
                        <ul className="nav-right">
                            <li><a target="_blank" href="https://github.com/Boxydev/WikiDoc">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

module.exports = Navbar