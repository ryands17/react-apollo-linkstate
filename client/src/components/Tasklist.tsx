import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Task } from 'config/types'

type TodolistProps = {
  tasks: Task[]
  toggleTask: (index: number) => void
  removeTask: (index: number) => void
  toggleAllTasks: (params: { completed: boolean }) => void
  location?: any
}

const Todolist: React.FC<TodolistProps> = ({
  tasks,
  toggleTask,
  removeTask,
  toggleAllTasks,
  location,
}) => {
  return tasks && tasks.length ? (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        onChange={() =>
          tasks.some(task => task.completed === false)
            ? toggleAllTasks({ completed: true })
            : toggleAllTasks({ completed: false })
        }
        checked={false}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {tasks
          .filter(task => {
            if (location.pathname === '/completed') {
              return task.completed
            }
            if (location.pathname === '/active') {
              return !task.completed
            }
            return true
          })
          .map((task, index) => (
            <li
              key={task.id}
              className={task.completed ? 'completed' : undefined}
            >
              <div className="view">
                <input
                  className="toggle"
                  onChange={() => toggleTask(index)}
                  checked={task.completed}
                  type="checkbox"
                />
                <label>{task.text}</label>
                <button onClick={() => removeTask(index)} className="destroy" />
              </div>
              <input className="edit" value={task.text} />
            </li>
          ))}
      </ul>
    </section>
  ) : null
}

export default withRouter(Todolist)
