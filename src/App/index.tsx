import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import './app.css'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { Tasklist } from 'components/Tasklist'

const App = () => {
  return (
    <Router>
      <div className="todoapp">
        <Header />
        <Tasklist />
        <Footer />
      </div>
    </Router>
  )
}

export default App
