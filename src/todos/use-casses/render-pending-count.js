import todoStore, { Filter } from "../../store/todo.store"

let element
/**
 * 
 * @param {String} elementId 
 */
export const renderPendingTodos = (elementId)=> {

    if(!element)
        element = document.querySelector(elementId)
    if(!element)
        throw new Error(`Element ${ elementId} not found`)

    element.innerHTML = todoStore.getTodos(Filter.Pending).length;

}