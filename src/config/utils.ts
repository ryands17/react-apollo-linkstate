export const ENTER = 'Enter'
export const ESCAPE_KEY = 27
export const ENTER_KEY = 13

export const fetchTasks = () => {
  try {
    return JSON.parse(localStorage.getItem('tasks') || '[]')
  } catch (e) {
    return []
  }
}
