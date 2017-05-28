import React from 'react'

class Page extends React.Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
        )
    }
}

module.exports = Page