import React, { useState, useCallback } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import './app.css'
import Header from 'components/Header'
import { Todo } from 'config/types'
import Footer from 'components/Footer'
import Todolist from 'components/Todolist'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: Math.random(),
      text: 'Learn Hooks',
      completed: true,
    },
    {
      id: Math.random(),
      text: 'Learn Apollo GQL',
      completed: false,
    },
  ])

  const createTodo = useCallback(
    text => {
      setTodos([
        ...todos,
        {
          id: Math.random(),
          text,
          completed: false,
        },
      ])
    },
    [todos]
  )

  const toggleTodo = useCallback(
    (index: number) => {
      const updatedTodos = [...todos]
      updatedTodos[index].completed = !updatedTodos[index].completed
      setTodos(updatedTodos)
    },
    [todos]
  )

  const removeTodo = useCallback(
    (index: number) => {
      const updatedTodos = [...todos]
      updatedTodos.splice(index, 1)
      setTodos(updatedTodos)
    },
    [todos]
  )

  const toggleAllTodos = useCallback(
    ({ completed }: { completed: boolean }) => {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed,
        }))
      )
    },
    [todos]
  )

  return (
    <Router>
      <div className="todoapp">
        <Header createTodo={createTodo} />
        <Todolist
          todos={todos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          toggleAllTodos={toggleAllTodos}
        />
        <Footer todos={todos} />
      </div>
    </Router>
  )
}

export default App
