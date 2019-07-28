import React, { useState, useCallback, useEffect } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import './app.css'
import Header from 'components/Header'
import { Task } from 'config/types'
import Footer from 'components/Footer'
import Tasklist from 'components/Tasklist'
import { fetchTasks } from 'config/utils'

const App: React.FC = () => {
  let [tasks, setTasks] = useState<Task[]>(fetchTasks())

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const createTask = useCallback(
    text => {
      setTasks([
        ...tasks,
        {
          id: Math.random(),
          text,
          completed: false,
        },
      ])
    },
    [tasks]
  )

  const toggleTodo = useCallback(
    (index: number) => {
      const updatedTodos = [...tasks]
      updatedTodos[index].completed = !updatedTodos[index].completed
      setTasks(updatedTodos)
    },
    [tasks]
  )

  const removeTodo = useCallback(
    (index: number) => {
      const updatedTodos = [...tasks]
      updatedTodos.splice(index, 1)
      setTasks(updatedTodos)
    },
    [tasks]
  )

  const toggleAllTodos = useCallback(
    ({ completed }: { completed: boolean }) => {
      setTasks(
        tasks.map(todo => ({
          ...todo,
          completed,
        }))
      )
    },
    [tasks]
  )

  const clearCompletedItems = useCallback(() => {
    setTasks(tasks.filter(todo => !todo.completed))
  }, [tasks])

  return (
    <Router>
      <div className="todoapp">
        <Header createTask={createTask} />
        <Tasklist
          tasks={tasks}
          toggleTask={toggleTodo}
          removeTask={removeTodo}
          toggleAllTasks={toggleAllTodos}
        />
        <Footer tasks={tasks} clearCompleted={clearCompletedItems} />
      </div>
    </Router>
  )
}

export default App
