import React, { useMemo } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import {
  useClearCompletedTasksMutation,
  useTasksQuery,
} from 'generated/graphql'

const Footer: React.FC<RouteComponentProps> = ({ location }) => {
  const { data } = useTasksQuery()
  const [clearCompletedTasks] = useClearCompletedTasksMutation()

  const remainingItems = useMemo(
    () => data && data.tasks.filter(task => !task.completed).length,
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
      <button className="clear-completed" onClick={() => clearCompletedTasks()}>
        Clear completed
      </button>
    </footer>
  )
}

export default withRouter(Footer)
