import React, { useState } from 'react'
import gql from 'graphql-tag'
import { ENTER } from 'config/utils'
import { useMutation } from '@apollo/react-hooks'
import { addTask, addTaskVariables } from 'generated/addTask'

const ADD_TASK = gql`
  mutation addTask($text: String!) {
    addTask(text: $text) @client {
      id
    }
  }
`

const Header: React.FC = () => {
  let [task, setTask] = useState<string>('')
  let [addTaskMutation] = useMutation<addTask, addTaskVariables>(ADD_TASK)

  return (
    <header className="header">
      <h1 style={{ textTransform: 'uppercase' }}>tasks</h1>
      <input
        className="new-todo"
        onChange={({ target }) => setTask(target.value)}
        onKeyPress={({ key }) => {
          if (key === ENTER && task.trim()) {
            addTaskMutation({
              variables: {
                text: task,
              },
            })
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
