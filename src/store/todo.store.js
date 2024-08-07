import { Todo } from '../models/todo.model'

const Filters = { All: 'all', Completed: 'completed', Pending: 'pending' }

const state = {
  todos: [
    new Todo('Piedra del Alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo')
  ],
  filter: Filters.All
}

const initStore = () => {
  console.log(state)
  console.log('Store inicializado 🆙')
}

export default {
  initStore
}
