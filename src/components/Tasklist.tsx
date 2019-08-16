import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Query, Mutation } from 'generated/graphql'
import Taskitem from './Taskitem'

export const FETCH_TASKS = gql`
  query Tasks {
    tasks @client {
      id
      text
      completed
    }
  }
`

const TOGGLE_ALL_TASKS = gql`
  mutation toggleAllTasks {
    toggleAllTasks @client {
      id
    }
  }
`

const Tasklist: React.FC<RouteComponentProps> = ({ location }) => {
  const { data } = useQuery<Query>(FETCH_TASKS)
  const [toggleAllTasksMutation] = useMutation<Mutation['toggleAllTasks']>(
    TOGGLE_ALL_TASKS
  )

  return (
    <section className="main">
      <input
        onChange={() => toggleAllTasksMutation()}
        className="toggle-all"
        type="checkbox"
        defaultChecked={false}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {data &&
          data.tasks
            .filter(task => {
              if (location.pathname === '/completed') {
                return task.completed
              }
              if (location.pathname === '/active') {
                return !task.completed
              }
              return true
            })
            .map(task => <Taskitem task={task} key={task.id} />)}
      </ul>
    </section>
  )
}

export default withRouter(Tasklist)
