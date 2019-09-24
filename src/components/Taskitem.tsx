import React, { useRef, useState, useEffect } from 'react'
import cx from 'classnames'
import { ESCAPE_KEY, ENTER_KEY } from 'config/utils'
import {
  Task,
  useRemoveTaskMutation,
  useEditTaskMutation,
  useToggleCompletedMutation,
} from 'generated/graphql'

type TaskitemType = {
  task: Task
}

const Taskitem: React.FC<TaskitemType> = ({ task }) => {
  const [removeTaskMutation] = useRemoveTaskMutation()
  const [editTaskMutation] = useEditTaskMutation()
  const [toggleCompletedMutation] = useToggleCompletedMutation()

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value
    if (isEditing) setEditText(text)
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
    if (inputRef.current) inputRef.current.focus()
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
