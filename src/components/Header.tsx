import React, { useState } from 'react'
import gql from 'graphql-tag'
import { ENTER } from 'config/utils'
import { useMutation } from '@apollo/react-hooks'
import { Mutation, MutationAddTaskArgs } from 'generated/graphql'

const ADD_TASK = gql`
  mutation addTask($text: String!) {
    addTask(text: $text) @client {
      id
    }
  }
`

const Header: React.FC = () => {
  let [text, setText] = useState('')
  let [addTaskMutation] = useMutation<Mutation['addTask'], MutationAddTaskArgs>(
    ADD_TASK
  )

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
