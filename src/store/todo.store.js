import { Todo } from '../models/todo.model'

export const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending'
}

const state = {
  todos: [
    new Todo('Piedra del Alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra del mente')
  ],
  filter: Filters.All
}

const initStore = () => {
  loadStore()
  console.log('Store inicializado 🆙')
}

const loadStore = () => {
  if (!localStorage.getItem('state')) return

  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem('state')
  )
  state.todos = todos
  state.filter = filter
}

const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state))
}

const getTodo = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      //Como state.todos devuelve un objeto... hay que devolver un arreglo con los TODOS requeridos, para eso creamos un nuevo array con spread (...) y el contenido del array
      return [...state.todos]
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done)
    case Filters.Pending:
      //todo.done === false
      return state.todos.filter((todo) => !todo.done)
    default:
      throw new Error(`función no permitida, filter: ${filter}`)
  }
}

/**
 *
 * @param {String} descripcion
 */
const addTodo = (descripcion) => {
  if (!descripcion) throw new Error('Error: Descripcion requerida!')
  state.todos.push(new Todo(descripcion))
  saveStateToLocalStorage()
}

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done
    }
    return todo
  })
  saveStateToLocalStorage()
}

/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId)
  saveStateToLocalStorage()
}

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done)
  saveStateToLocalStorage()
}

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.all) => {
  //TODO buscar que solo se puedan ejecutar los filtros definidos
  state.filter = newFilter
  saveStateToLocalStorage()
}

const getCurrentFilter = () => {
  return state.filter
}
export default {
  initStore,
  loadStore,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  getTodo
}
