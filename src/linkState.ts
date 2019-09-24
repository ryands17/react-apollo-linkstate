import ApolloClient from 'apollo-boost'
import { InMemoryCache, Resolvers, gql } from 'apollo-boost'
import { uuidv4 } from 'config/utils'
import { Query as Tasks, Task } from 'generated/graphql'
import { loader } from 'graphql.macro'

export const cache = new InMemoryCache()

type Context = {
  client: ApolloClient<unknown>
  cache: InMemoryCache
  getCacheKey: ({ __typename, id }: { __typename: string; id: string }) => any
}

const FETCH_TASKS = loader('./graphql/fetchTasks.graphql')

export const initializeData = () => {
  cache.writeData({
    data: {
      tasks: [
        {
          __typename: 'Task',
          id: uuidv4(),
          text: 'Learn React',
          completed: true,
        },
        {
          __typename: 'Task',
          id: uuidv4(),
          text: 'Learn Apollo Link State',
          completed: false,
        },
      ],
    },
  })
}

initializeData()

export const resolvers: Resolvers = {
  Mutation: {
    addTask: (_, { text }: { text: string }, { cache }: Context) => {
      const data = cache.readQuery<Tasks>({
        query: FETCH_TASKS,
      })

      const newTask: Task = {
        __typename: 'Task',
        id: uuidv4(),
        text,
        completed: false,
      }

      let newTasks = []
      if (data) {
        newTasks = [...data.tasks, newTask]
      } else {
        newTasks = [newTask]
      }
      cache.writeData({ data: { tasks: newTasks } })
      return newTask
    },
    editTask: (
      _,
      { id, text }: { id: string; text: string },
      { cache, getCacheKey }: Context
    ) => {
      const taskId = getCacheKey({ __typename: 'Task', id })
      const fragment = gql`
        fragment taskToEdit on Task {
          text
        }
      `
      const task = cache.readFragment<Task>({ fragment, id: taskId })
      if (task) {
        const data = { ...task, text }
        cache.writeData({
          id: taskId,
          data,
        })
      }
      return null
    },
    removeTask: (_, { id }: { id: string }, { cache }: Context) => {
      const data = cache.readQuery<Tasks>({
        query: FETCH_TASKS,
      })

      if (!data) {
        return null
      }
      const index = data.tasks.findIndex(task => task.id === id)
      if (index === -1) return null

      let [removedTask] = data.tasks.splice(index, 1)
      let newTasks = [...data.tasks]
      cache.writeData({
        data: {
          tasks: newTasks,
        },
      })

      return removedTask
    },
    toggleCompleted: (
      _,
      { id }: { id: string },
      { cache, getCacheKey }: Context
    ) => {
      const taskId = getCacheKey({ __typename: 'Task', id })
      const fragment = gql`
        fragment completedTask on Task {
          completed
        }
      `
      const task = cache.readFragment<Task>({ fragment, id: taskId })
      if (task) {
        const data = { ...task, completed: !task.completed }
        cache.writeData({
          id: taskId,
          data,
        })
      }
      return null
    },
    toggleAllTasks: (_, __, { cache }: Context) => {
      const data = cache.readQuery<Tasks>({
        query: FETCH_TASKS,
      })

      if (!data) {
        return null
      }
      let newTasks = data.tasks.map(task => ({
        ...task,
        completed: !task.completed,
      }))

      cache.writeData({
        data: {
          tasks: newTasks,
        },
      })
      return newTasks
    },
    clearCompleted: (_, __, { cache }: Context) => {
      const data = cache.readQuery<Tasks>({
        query: FETCH_TASKS,
      })

      if (!data) {
        return null
      }
      let newTasks = data.tasks.filter(task => !task.completed)
      cache.writeData({
        data: {
          tasks: newTasks,
        },
      })
      return newTasks
    },
  },
}
