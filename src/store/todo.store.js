import { Todo } from '../models/todo.model'

const Filters = { All: 'all', Completed: 'completed', Pending: 'pending' }

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
  console.log(state)
  console.log('Store inicializado 🆙')
}

const loadStore = () => {
  throw new Error('No implementado')
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
}

/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId)
}

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => todo.done)
}

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.all) => {
  //TODO buscar que solo se puedan ejecutar los filtros definidos
  state.filter = newFilter
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
