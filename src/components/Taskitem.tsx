import * as React from 'react'
import cx from 'classnames'
import { ESCAPE_KEY, ENTER_KEY } from 'config/utils'
import { Task } from 'generated/queries'
import { taskOperations } from 'config/state'

type Props = {
  task: Task
}

export const Taskitem = ({ task }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editText, setEditText] = React.useState('')
  const [editId, setEditId] = React.useState<string | null>(null)

  const handleEdit = ({ text, id }: { text: string; id: string }) => {
    setIsEditing(true)
    setEditText(text)
    setEditId(id)
  }

  const handleSubmit = (id: string) => {
    if (editText.trim()) {
      taskOperations.editTask({
        id,
        text: editText,
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

  React.useEffect(() => {
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
          onChange={() => {
            taskOperations.toggleTask(task.id)
          }}
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
          onClick={() => {
            taskOperations.removeTask(task.id)
          }}
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
