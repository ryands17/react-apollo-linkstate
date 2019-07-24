import React, { useMemo } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Todo } from 'config/types'

type FooterProps = {
  location?: any
  todos: Todo[]
  clearCompleted: () => void
}

const Footer: React.FC<FooterProps> = ({ location, todos, clearCompleted }) => {
  let remainingItems = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos]
  )

  return todos.length ? (
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
