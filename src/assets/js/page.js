import React from 'react'

class Page extends React.Component {
    render() {
        var html = this.props.html
        var sourceUrl = this.props.sourceUrl
        return (
            <section className="wrap page-content">
                <div className="edit-page-link">
                    <span id="switch-theme">Switch to dark</span>
                    <a href={"https://github.com/boxydev/wiki-doc/tree/master/" + sourceUrl} target="_blank">Modifier sur GitHub</a>
                </div>
                
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </section>
        )
    }
}

module.exports = Page
