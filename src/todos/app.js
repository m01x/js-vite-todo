import html from './app.html?raw'
/**
 *
 * @param {String} elementId
 * @returns
 */
export const App = (elementId) => {
  //Funcion anonima, auto invocada. Esto se llama cuando la funcion APP se llama...
  ;(() => {
    const app = document.createElement('div')
    app.innerHTML = html
    document.querySelector(elementId).append(app)
  })()
}
