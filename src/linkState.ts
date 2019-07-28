import { InMemoryCache } from 'apollo-boost'
import { uuidv4 } from 'config/utils'

export const initializeData = (cache: InMemoryCache) => {
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

export const resolvers = {}
