import { InMemoryCache, makeVar } from '@apollo/client'
import { produce } from 'immer'
import { uuidv4 } from './utils'

export type Task = {
  id: string
  text: string
  completed: boolean
}

export type Tasks = Task[]

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tasks: {
          read() {
            return tasks()
          },
        },
      },
    },
  },
})

const initialTasks: Tasks = [
  {
    id: uuidv4(),
    text: 'Learn React hooks',
    completed: true,
  },
  {
    id: uuidv4(),
    text: 'Implement Apollo 3',
    completed: false,
  },
]

const tasks = makeVar<Tasks>(initialTasks)

export const taskOperations = {
  addtask(text: string) {
    let initialTasks = tasks()
    tasks(
      produce(initialTasks, draft => {
        draft.push({
          id: uuidv4(),
          text,
          completed: false,
        })
      })
    )
  },
  toggleTask(id: string) {
    let initialTasks = tasks()
    let index = initialTasks.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks(
        produce(initialTasks, draft => {
          draft[index].completed = !initialTasks[index].completed
        })
      )
    }
  },
  editTask({ id, text }: { id: string; text: string }) {
    let initialTasks = tasks()
    let index = initialTasks.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks(
        produce(initialTasks, draft => {
          draft[index].text = text
        })
      )
    }
  },
  removeTask(id: string) {
    let initialTasks = tasks()
    let index = initialTasks.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks(
        produce(initialTasks, draft => {
          draft.splice(index, 1)
        })
      )
    }
  },
  clearCompleted() {
    let initialTasks = tasks()
    tasks(initialTasks.filter(task => !task.completed))
  },
  toggleAlltasks() {
    let initialTasks = tasks()
    tasks(
      produce(initialTasks, draft => {
        draft.forEach(task => {
          task.completed = !task.completed
        })
      })
    )
  },
}
