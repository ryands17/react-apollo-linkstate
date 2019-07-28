import React, { useMemo } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Task } from 'config/types'

type FooterProps = RouteComponentProps & {
  location?: any
  tasks: Task[]
  clearCompleted: () => void
}

const Footer: React.FC<FooterProps> = ({ location, tasks, clearCompleted }) => {
  let remainingItems = useMemo(
    () => tasks.filter(task => !task.completed).length,
    [tasks]
  )

  return tasks.length ? (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remainingItems}</strong>{' '}
        {remainingItems === 1 ? `item` : `items`} left
      </span>
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
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  ) : null
}

export default withRouter(Footer)
