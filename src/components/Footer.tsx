import React, { useMemo } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Tasks } from 'generated/Tasks'
import { FETCH_TASKS } from './Tasklist'

const Footer: React.FC<RouteComponentProps> = ({ location }) => {
  const { data } = useQuery<Tasks>(FETCH_TASKS)

  let remainingItems = useMemo(
    () => data && data.tasks.filter(task => !task.completed).length,
    [data]
  )

  return data && data.tasks.length ? (
    <footer className="footer">
      {remainingItems && (
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
      {/* TODO: add clear completed mutation */}
      <button className="clear-completed">Clear completed</button>
    </footer>
  ) : null
}

export default withRouter(Footer)
