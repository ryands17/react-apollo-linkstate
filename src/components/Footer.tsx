import React, { useMemo } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Tasks, taskOperations } from 'config/state'

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

const Footer: React.FC<RouteComponentProps> = ({ location }) => {
  const { data } = useQuery<Data>(GET_ALL_TASKS)

  const remainingItems = useMemo(
    () => data?.tasks.filter(task => !task.completed).length,
    [data]
  )

  if (!data) {
    return null
  }

  return (
    <footer className="footer">
      {remainingItems !== undefined && (
        <span className="todo-count">
          <strong>{remainingItems}</strong>{' '}
          {remainingItems === 1 ? `item` : `items`} left
        </span>
      )}
      <ul className="filters">
        <li>
          <Link
            className={location.pathname === '/' ? 'selected' : undefined}
            to="/"
          >
            All
          </Link>
        </li>
        <li>
          <Link
            className={location.pathname === '/active' ? 'selected' : undefined}
            to="/active"
          >
            Active
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === '/completed' ? 'completed' : undefined
            }
            to="/completed"
          >
            Completed
          </Link>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => {
          taskOperations.clearCompleted()
        }}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default withRouter(Footer)
