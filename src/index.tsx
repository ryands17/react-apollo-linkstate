import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import 'todomvc-app-css/index.css'
import 'index.css'

import App from 'App'
import { initializeData, cache, resolvers } from 'linkState'

const client = new ApolloClient({
  cache,
  typeDefs: loader('./client-schema.graphql'),
  resolvers,
})

client.onClearStore(async () => {
  initializeData()
})

client.onResetStore(async () => {
  initializeData()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
