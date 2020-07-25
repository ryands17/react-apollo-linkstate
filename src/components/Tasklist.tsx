import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Tasks, taskOperations } from 'config/state'
import { gql, useQuery } from '@apollo/client'
import Taskitem from './Taskitem'

export const GET_ALL_TASKS = gql`
  query getAllTasks {
    tasks @client {
      id
      text
      completed
    }
  }
`

type Data = {
  tasks: Tasks
}

const Tasklist: React.FC<RouteComponentProps> = ({ location }) => {
  const { data } = useQuery<Data>(GET_ALL_TASKS)

  return (
    <section className="main">
      <input
        onChange={() => {
          taskOperations.toggleAlltasks()
        }}
        className="toggle-all"
        type="checkbox"
        defaultChecked={false}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {data?.tasks
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
            <Taskitem task={task} key={task.id} />
          ))}
      </ul>
    </section>
  )
}

export default withRouter(Tasklist)
