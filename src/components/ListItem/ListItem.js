import React, { Component } from "react"
import PropTypes from "prop-types"
import "./ListItem.css"
import moment from "moment"

class ListItem extends Component {
  render() {
    const { issue } = this.props
    return (
      <div className="ListItem">
        <a href={issue.author.url} className="ListImage">
          <img src={issue.author.avatarUrl} alt={issue.author.url} />
        </a>
        <div className="ListContent">
          <h2 className="ListTitle">{issue.title}</h2>
          {issue.bodyText && <div className="ListText">{issue.bodyText}</div>}
          <div className="ListDate">{moment(issue.createdAt).calendar()}</div>
        </div>
      </div>
    )
  }
}

ListItem.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired
    })
  }).isRequired
}

export default ListItem
