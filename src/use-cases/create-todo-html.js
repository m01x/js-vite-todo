import { Todo } from '../models/todo.model'

/**
 * Use case > Create Todo...
 * Crea el listado HTML y devuelve un elemento <li></li>
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error('a TODO Object is required')

  //Vamos a desestructurar el todo, para no andar escribiendo tanto todo.id, todo.description, etcetc
  const { done, description, id } = todo

  const html = `<div class="view">
                    <input class="toggle" type="checkbox" ${
                      done ? 'checked' : ''
                    }>
                    <label>${description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">`
  const liElement = document.createElement('li')
  liElement.innerHTML = html
  liElement.setAttribute('data-id', id)
  if (done) liElement.classList.add('completed')

  return liElement
}

/**
 * <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li>
 */
