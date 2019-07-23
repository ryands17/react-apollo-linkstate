import React from 'react'
import { withRouter } from 'react-router-dom'
import { Todo } from 'config/types'

type TodolistProps = {
  todos: Todo[]
  toggleTodo: (index: number) => void
  removeTodo: (index: number) => void
  toggleAllTodos: (params: { completed: boolean }) => void
  location?: any
}

const Todolist: React.FC<TodolistProps> = ({
  todos,
  toggleTodo,
  removeTodo,
  toggleAllTodos,
  location,
}) => {
  return todos && todos.length ? (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        onChange={() =>
          todos.some(todo => todo.completed === false)
            ? toggleAllTodos({ completed: true })
            : toggleAllTodos({ completed: false })
        }
        checked={false}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos
          .filter(todo => {
            if (location.pathname === '/completed') {
              return todo.completed
            }
            if (location.pathname === '/active') {
              return !todo.completed
            }
            return true
          })
          .map((todo, index) => (
            <li
              key={todo.id}
              className={todo.completed ? 'completed' : undefined}
            >
              <div className="view">
                <input
                  className="toggle"
                  onChange={() => toggleTodo(index)}
                  checked={todo.completed}
                  type="checkbox"
                />
                <label>{todo.text}</label>
                <button onClick={() => removeTodo(index)} className="destroy" />
              </div>
              <input className="edit" onChange={() => {}} value={todo.text} />
            </li>
          ))}
      </ul>
    </section>
  ) : null
}

export default withRouter(Todolist)
