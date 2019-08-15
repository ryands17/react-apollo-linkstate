import React, { useState, useCallback } from 'react'
import { HashRouter as Router } from 'react-router-dom'

import './app.css'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Tasklist from 'components/Tasklist'

const App: React.FC = () => {
  let [tasks, setTasks] = useState<Array<any>>([])

  const editTask = useCallback(
    ({ index, text }: { index: number; text: string }) => {
      const updatedTasks = [...tasks]
      updatedTasks[index].text = text
      setTasks(updatedTasks)
    },
    [tasks]
  )

  const clearCompletedItems = useCallback(() => {
    setTasks(tasks.filter(todo => !todo.completed))
  }, [tasks])

  return (
    <Router>
      <div className="todoapp">
        <Header />
        <Tasklist editTask={editTask} />
        <Footer tasks={tasks} clearCompleted={clearCompletedItems} />
      </div>
    </Router>
  )
}

export default App
