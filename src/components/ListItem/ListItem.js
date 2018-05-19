import React, { Component } from "react"
import PropTypes from "prop-types"
import "./ListItem.css"
import moment from "moment"

class ListItem extends Component {
  render() {
    const { issue } = this.props
    return (
      <div className="ListItem">
        <div className="ListHeader">
          <a href={issue.author.url} className="ListImage">
            <img src={issue.author.avatarUrl} alt={issue.author.url} />
          </a>
          <div className="ListAuthor">
            <div className="ListLogin">{issue.author.login}</div>
            {issue.author.name && (
              <div className="ListAuthorName">{issue.author.name}</div>
            )}
          </div>
          <div className="ListDate">{moment(issue.createdAt).calendar()}</div>
        </div>
        <div className="ListContent">
          <h2 className="ListTitle">{issue.title}</h2>
          {issue.bodyText && <div className="ListText">{issue.bodyText}</div>}
          <a href={issue.repository.url} className="ListRepoLink">
            View repository
          </a>
        </div>
      </div>
    )
  }
}

ListItem.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    repository: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired,
    author: PropTypes.shape({
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  }).isRequired
}

export default ListItem
