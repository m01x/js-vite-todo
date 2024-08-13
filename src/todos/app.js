import html from './app.html?raw'
import todoStore from '../store/todo.store'
import { renderTodos } from '../use-cases'

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoInputs: '#new-todo-input'
}
/**
 *
 * @param {String} elementId
 * @returns
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodo(todoStore.getCurrentFilter())
    renderTodos(ElementIDs.TodoList, todos)
  }

  //Funcion anonima, auto invocada. Esto se ejecuta cuando la funcion APP se llama...
  ;(() => {
    const app = document.createElement('div')
    app.innerHTML = html
    document.querySelector(elementId).append(app)
    displayTodos()
  })()

  //Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInputs)
  const todoListUL = document.querySelector(ElementIDs.TodoList)

  //Listeners
  newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return
    if (event.target.value.trim().length === 0) return

    todoStore.addTodo(event.target.value)
    displayTodos()
    event.target.value = ''
  })

  todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]')
    todoStore.toggleTodo(element.getAttribute('data-id'))
    displayTodos()
  })

  todoListUL.addEventListener('click', (event) => {
    const isDestroyElement = event.target.className === 'destroy'
    const element = event.target.closest('[data-id]')

    //validamos si tenemos elemento y algo con la clase destroy (es el btn)
    if (!element || !isDestroyElement) return

    todoStore.deleteTodo(element.getAttribute('data-id'))
    displayTodos()
  })
}
