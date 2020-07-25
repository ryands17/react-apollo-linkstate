import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider } from '@apollo/client'

import 'todomvc-app-css/index.css'
import 'index.css'

import App from 'App'
import { cache } from 'config/state'

const client = new ApolloClient({
  cache,
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
