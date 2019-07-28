export const ENTER = 'Enter'

export const fetchTasks = () => {
  try {
    return JSON.parse(localStorage.getItem('tasks') || '[]')
  } catch (e) {
    return []
  }
}
