import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { taskOperations } from 'config/state'
import { useRemainingTasksQuery } from 'generated/queries'

export const Footer = () => {
  const location = useLocation()
  const { data } = useRemainingTasksQuery()

  return (
    <footer className="footer">
      {data?.remainingTasks !== undefined && (
        <span className="todo-count">
          <strong>{data?.remainingTasks}</strong>{' '}
          {data?.remainingTasks === 1 ? `item` : `items`} left
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
