import * as React from 'react'
import { ENTER } from 'config/utils'
import { taskOperations } from 'config/state'

const Header: React.FC = () => {
  let [text, setText] = React.useState('')

  return (
    <header className="header">
      <h1 style={{ textTransform: 'uppercase' }}>tasks</h1>
      <input
        className="new-todo"
        onChange={({ target }) => setText(target.value)}
        onKeyPress={({ key }) => {
          if (key === ENTER && text.trim()) {
            taskOperations.addtask(text)
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
