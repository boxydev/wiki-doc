import React from 'react'

class Page extends React.Component {
    render() {
        var html = this.props.html
        var sourceUrl = this.props.sourceUrl
        return (
            <section className="wrap page-content">
                <a className="edit-page-link" href={"https://github.com/boxydev/wiki-doc/tree/master/" + sourceUrl} target="_blank">Modifier sur GitHub</a>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </section>
        )
    }
}

module.exports = Page
