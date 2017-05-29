import React from 'react'

class Navbar extends React.Component {
    render() {
        var baseUrl = this.props.baseUrl
        var url = this.props.url
        return (
            <nav>
                <div className="wrap">
                    <a className="nav-home" href="./index.html">
                        <img className="nav-logo" src="https://www.boxydev.com/img/logo.png" alt="WikiDoc" />
                        &nbsp;&nbsp;WikiDoc
                    </a>
                    <div className="nav-list">
                        <ul className="nav-left">
                            <li><a className={url === '/index.html' ? 'active' : ''} href={baseUrl + 'index.html'}>Accueil</a></li>
                            <li><a className={url === '/about.html' ? 'active' : ''} href={baseUrl + 'about.html'}>A propos</a></li>
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