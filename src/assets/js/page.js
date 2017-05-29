import React from 'react'

class Page extends React.Component {
    render() {
        var url = this.props.url
        return (
            <div>
                <a className="edit-page-link" href={"https://github.com/boxydev/WikiDoc/tree/master/" + url} target="_blank">Edit on GitHub</a>
                <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
            </div>
        )
    }
}

module.exports = Page