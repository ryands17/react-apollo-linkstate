import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useToggleAllTasksMutation, useTasksQuery } from 'generated/graphql'
import Taskitem from './Taskitem'

const Tasklist: React.FC<RouteComponentProps> = ({ location }) => {
  const { data } = useTasksQuery()
  const [toggleAllTasksMutation] = useToggleAllTasksMutation()

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
