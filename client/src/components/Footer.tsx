import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Todo } from 'config/types'

type FooterProps = {
  location?: any
  todos: Todo[]
}

const Footer: React.FC<FooterProps> = ({ location, todos }) => {
  return todos.length ? (
    <footer className="footer">
      <span className="todo-count">
        <strong>0</strong> item left
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
      <button className="clear-completed">Clear completed</button>
    </footer>
  ) : null
}

export default withRouter(Footer)
