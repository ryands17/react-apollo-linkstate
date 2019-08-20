import React, { useRef, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import cx from 'classnames'
import { ESCAPE_KEY, ENTER_KEY } from 'config/utils'
import {
  Task,
  Mutation,
  MutationRemoveTaskArgs,
  MutationEditTaskArgs,
  MutationToggleCompletedArgs,
} from 'generated/graphql'

type TaskitemType = {
  task: Task
}

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

const TOGGLE_COMPLETED = gql`
  mutation toggleCompleted($id: ID!) {
    toggleCompleted(id: $id) @client {
      id
    }
  }
`

const Taskitem: React.FC<TaskitemType> = ({ task }) => {
  const [removeTaskMutation] = useMutation<
    Mutation['removeTask'],
    MutationRemoveTaskArgs
  >(REMOVE_TASK)
  const [editTaskMutation] = useMutation<
    Mutation['editTask'],
    MutationEditTaskArgs
  >(EDIT_TASK)
  const [toggleCompletedMutation] = useMutation<
    Mutation['toggleCompleted'],
    MutationToggleCompletedArgs
  >(TOGGLE_COMPLETED)

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
    <li
      className={cx({
        completed: task.completed,
        editing: editId === task.id && isEditing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          onChange={() =>
            toggleCompletedMutation({
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
          onDoubleClick={() => handleEdit({ text: task.text, id: task.id })}
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
  )
}

export default Taskitem
