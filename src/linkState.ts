import { InMemoryCache } from 'apollo-boost'
import { uuidv4 } from 'config/utils'

export const cache = new InMemoryCache()

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

export const resolvers = {}
