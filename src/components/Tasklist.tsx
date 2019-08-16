import React, { useState, useRef, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ESCAPE_KEY, ENTER_KEY } from 'config/utils'
import {
  Query,
  Mutation,
  MutationRemoveTaskArgs,
  MutationEditTaskArgs,
  MutationToggleTaskArgs,
} from 'generated/graphql'

export const FETCH_TASKS = gql`
  query Tasks {
    tasks @client {
      id
      text
      completed
    }
  }
`

const REMOVE_TASK = gql`
  mutation removeTask($id: ID!) {
    removeTask(id: $id) @client {
      id
    }
  }
`

const EDIT_TASK = gql`
  mutation editTask($id: ID!, $text: String!) {
    editTask(id: $id, text: $text) @client {
      id
    }
  }
`

const TOGGLE_TASK = gql`
  mutation toggleTask($id: ID!) {
    toggleTask(id: $id) @client {
      id
    }
  }
`

const TOGGLE_ALL_TASKS = gql`
  mutation toggleAllTasks {
    toggleAllTasks @client {
      id
    }
  }
`

const Tasklist: React.FC<RouteComponentProps> = ({ location }) => {
  const { data } = useQuery<Query>(FETCH_TASKS)
  const [removeTaskMutation] = useMutation<
    Mutation['removeTask'],
    MutationRemoveTaskArgs
  >(REMOVE_TASK)
  const [editTaskMutation] = useMutation<
    Mutation['editTask'],
    MutationEditTaskArgs
  >(EDIT_TASK)
  const [toggleTaskMutation] = useMutation<
    Mutation['toggleTask'],
    MutationToggleTaskArgs
  >(TOGGLE_TASK)
  const [toggleAllTasksMutation] = useMutation<Mutation['toggleAllTasks']>(
    TOGGLE_ALL_TASKS
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  const handleEdit = ({ text, id }: { text: string; id: string }) => {
    setIsEditing(true)
    setEditText(text)
    setEditId(id)
  }

  const handleSubmit = (id: string) => {
    if (editText.trim()) {
      editTaskMutation({
        variables: {
          id,
          text: editText,
        },
      })
      setEditText('')
      setIsEditing(false)
      setEditId(null)
    }
  }

  const handleChange = (e: any) => {
    const text = e.target.value
    if (isEditing) {
      setEditText(text)
    }
  }

  const handleKeyUp = ({ which, id }: { which: number; id: string }) => {
    if (which === ESCAPE_KEY) {
      setIsEditing(false)
      setEditText('')
      setEditId(null)
    } else if (which === ENTER_KEY) {
      handleSubmit(id)
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return (
    <section className="main">
      <input
        onChange={() => toggleAllTasksMutation()}
        className="toggle-all"
        type="checkbox"
        defaultChecked={false}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {data &&
          data.tasks
            .filter(task => {
              if (location.pathname === '/completed') {
                return task.completed
              }
              if (location.pathname === '/active') {
                return !task.completed
              }
              return true
            })
            .map(task => (
              <li
                key={task.id}
                className={cx({
                  completed: task.completed,
                  editing: editId === task.id && isEditing,
                })}
              >
                <div className="view">
                  <input
                    className="toggle"
                    onChange={() =>
                      toggleTaskMutation({
                        variables: {
                          id: task.id,
                        },
                      })
                    }
                    checked={task.completed}
                    readOnly
                    type="checkbox"
                  />
                  <label
                    onDoubleClick={() =>
                      handleEdit({ text: task.text, id: task.id })
                    }
                  >
                    {task.text}
                  </label>
                  <button
                    className="destroy"
                    onClick={() =>
                      removeTaskMutation({
                        variables: {
                          id: task.id,
                        },
                      })
                    }
                  />
                </div>
                {editId && (
                  <input
                    className="edit"
                    ref={inputRef}
                    value={editText}
                    onChange={handleChange}
                    onBlur={() => handleSubmit(task.id)}
                    onKeyUp={({ which }) => handleKeyUp({ which, id: task.id })}
                  />
                )}
              </li>
            ))}
      </ul>
    </section>
  )
}

export default withRouter(Tasklist)
