import React, { useState, useCallback, useRef, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Task } from 'config/types'
import { ESCAPE_KEY, ENTER_KEY } from 'config/utils'

type TasklistProps = RouteComponentProps & {
  tasks: Task[]
  toggleTask: (index: number) => void
  removeTask: (index: number) => void
  toggleAllTasks: (params: { completed: boolean }) => void
  editTask: (params: { index: number; text: string }) => void
}

const FETCH_TASKS = gql`
  query Tasks {
    tasks @client {
      id
      text
      completed
    }
  }
`

const Tasklist: React.FC<TasklistProps> = ({
  tasks,
  toggleTask,
  removeTask,
  toggleAllTasks,
  editTask,
  location,
}) => {
  const { data } = useQuery(FETCH_TASKS)
  console.log({ data })

  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const handleEdit = useCallback(
    ({ text, index }: { text: string; index: number }) => {
      setIsEditing(true)
      setEditText(text)
      setEditIndex(index)
    },
    []
  )

  const handleSubmit = useCallback(
    index => {
      editTask({ index, text: editText })
      setEditText('')
      setIsEditing(false)
      setEditIndex(null)
    },
    [editTask, editText]
  )

  const handleChange = useCallback(
    e => {
      const text = e.target.value
      if (isEditing) {
        setEditText(text)
      }
    },
    [isEditing]
  )

  const handleKeyUp = useCallback(
    ({ which, index }) => {
      if (which === ESCAPE_KEY) {
        setIsEditing(false)
        setEditText('')
        setEditIndex(null)
      } else if (which === ENTER_KEY) {
        handleSubmit(index)
      }
    },
    [handleSubmit]
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return tasks && tasks.length ? (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        onChange={() =>
          tasks.some(task => !task.completed)
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
              className={cx({
                completed: task.completed,
                editing: editIndex === index && isEditing,
              })}
            >
              <div className="view">
                <input
                  className="toggle"
                  onChange={() => toggleTask(index)}
                  checked={task.completed}
                  type="checkbox"
                />
                <label
                  onDoubleClick={() => handleEdit({ text: task.text, index })}
                >
                  {task.text}
                </label>
                <button onClick={() => removeTask(index)} className="destroy" />
              </div>
              {editIndex && (
                <input
                  className="edit"
                  ref={inputRef}
                  value={editText}
                  onChange={handleChange}
                  onBlur={() => handleSubmit(index)}
                  onKeyUp={({ which }) => handleKeyUp({ which, index })}
                />
              )}
            </li>
          ))}
      </ul>
    </section>
  ) : null
}

export default withRouter(Tasklist)
