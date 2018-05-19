import React from "react"
import ReactDOM from "react-dom"
import App from "../App"
import { ApolloLink, Observable } from "apollo-link"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"

export default class MockLink extends ApolloLink {
  constructor(data) {
    super()
    this.data = data
  }

  request() {
    return new Observable(observer => {
      observer.next(this.data)
      observer.complete()
    })
  }
}

const data = {
  search: {
    nodes: [
      {
        id: "issueID",
        title: "Issue title",
        bodyText:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        createdAt: "2018-05-19T09:07:23Z",
        author: {
          url: "url",
          avatarUrl: "avatarUrl"
        }
      },
      {
        id: "issueID2",
        title: "Issue title",
        bodyText:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        createdAt: "2018-05-19T09:07:23Z",
        author: {
          url: "url",
          avatarUrl: "avatarUrl"
        }
      }
    ]
  }
}

describe("<App />", () => {
  it("should render <App />", () => {
    const client = new ApolloClient({
      link: new MockLink(data),
      cache: new InMemoryCache()
    })
    const div = document.createElement("div")
    const wrapper = ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      div
    )
    expect(wrapper).toMatchSnapshot()
  })
})
