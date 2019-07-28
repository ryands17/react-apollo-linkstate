import React, { useState } from 'react'
import { ENTER } from 'config/utils'

type HeaderProps = {
  createTask: (text: string) => void
}

const Header: React.FC<HeaderProps> = ({ createTask }) => {
  let [task, setTask] = useState<string>('')

  return (
    <header className="header">
      <h1 style={{ textTransform: 'uppercase' }}>tasks</h1>
      <input
        className="new-todo"
        onChange={({ target }) => setTask(target.value)}
        onKeyPress={({ key }) => {
          if (key === ENTER) {
            createTask(task)
            setTask('')
          }
        }}
        value={task}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

export default Header
