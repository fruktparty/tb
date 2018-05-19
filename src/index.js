import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App/App"
import registerServiceWorker from "./registerServiceWorker"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory"
import introspectionQueryResultData from "./fragmentTypes.json"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink, Observable } from "apollo-link"

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })

const request = async operation => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    requestLink,
    new HttpLink({
      uri: "https://api.github.com/graphql",
      credentials: "same-origin"
    })
  ]),
  cache: cache
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

registerServiceWorker()
