import React, { Component } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import "./List.css"
import ListItem from "../ListItem/ListItem"

class List extends Component {
  render() {
    return (
      <div className="List">
        <Query
          query={gql`
            {
              search(query: "language:JavaScript", type: ISSUE, first: 20) {
                nodes {
                  ... on Issue {
                    id
                    createdAt
                    title
                    url
                    bodyText
                    repository {
                      url
                    }
                    author {
                      avatarUrl
                      url
                      login
                      ... on User {
                        name
                      }
                    }
                  }
                }
              }
            }
          `}
          pollInterval={10000}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Something went wrong fetching issues.</p>
            return data.search.nodes.map(issue => {
              return issue.id && <ListItem issue={issue} key={issue.id} />
            })
          }}
        </Query>
      </div>
    )
  }
}

export default List
