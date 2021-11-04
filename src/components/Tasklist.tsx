import { useLocation } from 'react-router-dom'
import { taskOperations } from 'config/state'
import { useQuery } from '@apollo/client'
import { GetAllTasksDocument } from 'generated/typed-document-nodes'
import { Taskitem } from './Taskitem'

export const Tasklist = () => {
  const location = useLocation()
  const { data } = useQuery(GetAllTasksDocument)

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
