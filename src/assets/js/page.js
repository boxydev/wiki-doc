import React from 'react'

class Page extends React.Component {
    render() {
        var url = this.props.url
        return (
            <section className="wrap page-content">
                <a className="edit-page-link" href={"https://github.com/boxydev/WikiDoc/tree/master/" + url} target="_blank">Modifier sur GitHub</a>
                <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
            </section>
        )
    }
}

module.exports = Page