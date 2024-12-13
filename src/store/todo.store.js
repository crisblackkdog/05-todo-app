import {Todo} from '../todos/models/todo.model'

export const Filter = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state= {
    todos:[
        new Todo('piedra del alma'),
        new Todo('piedra del infinito'),
        new Todo('piedra del tiempo'),
    ],
    filter: Filter.All,
}


const initStore = () => {
    loadStore()
    console.log('initstore');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {todos=[], filter=Filters.All}=JSON.parse(localStorage.getItem('state'))
    state.todos =todos;
    state.filter = filter
}

const saveStateToLocalStorage = ()=>{
    
    localStorage.setItem('state', JSON.stringify(state))
}
/**
 * 
 * @param {String} description 
 */

const getTodos = (filter = Filter.All) => {
    switch( filter ){
        case Filter.All:
            return [...state.todos];

        case Filter.Completed:
            return state.todos.filter( todo => todo.done)

        case Filter.Pending:
            return state.todos.filter( todo => !todo.done)

        default:
            throw new Error(`Option ${ filter } is not valid`)
    }
}

const addTodo = (description) => {
    if(!description)throw new Error('Description is required');
    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}
                
/**
 * 
 * @param {String} todoId todo Identifier 
 */
const toggleTodo = (todoId) =>{
    state.todos = state.todos.map(todo=>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })
    saveStateToLocalStorage()
}

const deleteTodo=(todoId)=>{
    state.todos = state.todos.filter(todo =>todo.id !== todoId )
    saveStateToLocalStorage()
}

const deleteCompleted=()=>{
    state.todos = state.todos.filter(todo => !todo.done)
    saveStateToLocalStorage()
}

const setFilter= (newFilter = Filter.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage()
}

const getCurrentFilter = () => {
    return state.filter
}

export default{
    addTodo,
    getTodos,
    initStore,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}