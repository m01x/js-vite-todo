import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from '../use-cases'

const ElementIDs = {
  ClearCompleted: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInputs: '#new-todo-input',
  TodoFilters: '.filtro',
  PendingCountLabel: '#pending-count'
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
    updatePendingCount()
  }

  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel)
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
  const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted)
  const filtersListItems = document.querySelectorAll(ElementIDs.TodoFilters)

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

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted()
    displayTodos()
  })

  filtersListItems.forEach((element) => {
    element.addEventListener('click', (element) => {
      filtersListItems.forEach((el) => el.classList.remove('selected'))
      element.target.classList.add('selected')

      //Debemos conocer el valor del boton seleccionado, para realizar la funcion adecuada.
      switch (element.target.innerHTML) {
        case 'Todos':
          todoStore.setFilter(Filters.All)
          break
        case 'Pendientes':
          todoStore.setFilter(Filters.Pending)
          break
        case 'Completados':
          todoStore.setFilter(Filters.Completed)
          break
      }

      displayTodos()
    })
  })
}
