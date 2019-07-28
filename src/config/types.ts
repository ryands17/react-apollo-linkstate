export interface Task {
  id: number
  text: string
  completed: boolean
}

export interface DefaultState {
  tasks: Task[]
}
