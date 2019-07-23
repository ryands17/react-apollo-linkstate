import React, { useState } from 'react'
import { ENTER } from 'config/utils'

type HeaderProps = {
  createTodo: (text: string) => void
}

const Header: React.FC<HeaderProps> = ({ createTodo }) => {
  let [text, setText] = useState<string>('')

  return (
    <header className="header">
      <h1 style={{ textTransform: 'uppercase' }}>todos</h1>
      <input
        className="new-todo"
        onChange={({ target }) => setText(target.value)}
        onKeyPress={({ key }) => {
          if (key === ENTER) {
            createTodo(text)
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
