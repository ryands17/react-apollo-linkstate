import React, { useState } from 'react'
import { ENTER } from 'config/utils'
import { useAddTaskMutation } from 'generated/graphql'

const Header: React.FC = () => {
  let [text, setText] = useState('')
  let [addTaskMutation] = useAddTaskMutation()

  return (
    <header className="header">
      <h1 style={{ textTransform: 'uppercase' }}>tasks</h1>
      <input
        className="new-todo"
        onChange={({ target }) => setText(target.value)}
        onKeyPress={({ key }) => {
          if (key === ENTER && text.trim()) {
            addTaskMutation({
              variables: {
                text,
              },
            })
            setText('')
          }
        }}
        value={text}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

export default Header
