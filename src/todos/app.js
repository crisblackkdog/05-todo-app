import todoStore, { Filter } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos,renderPendingTodos } from "./use-casses/index";


const elementIds = {

    clearCompleted:'.clear-completed',
    TodoList : '.todo-list',
    newTodoInput : '#new-todo-input',
    todoFilters:'.filtro',
    PendingCountlabel:'#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId)=>{


    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos( elementIds.TodoList, todos )
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPendingTodos(elementIds.PendingCountlabel)
    }

    //cuando la funcion App() sellama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app)
        displayTodos()
    })()


    //referencias HTML
    const newDescriptionInput = document.querySelector(elementIds.newTodoInput);
    const todoListUL = document.querySelector(elementIds.TodoList);
    const clearCompletedButton = document.querySelector(elementIds.clearCompleted);
    const filterUl =document.querySelectorAll(elementIds.todoFilters)
    //listeners

    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode!== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value);
        displayTodos()
        event.target.value='';
    });

    todoListUL.addEventListener('click', (event)=>{
        const elemento = event.target.closest('[data-id]')
        todoStore.toggleTodo(elemento.getAttribute('data-id'));
        displayTodos();
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]')
        if(!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos()
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos()
    });

    filterUl.forEach(element => {
        
        
        element.addEventListener('click',(element)=>{
            filterUl.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected')

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filter.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filter.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filter.Completed)
                    break;
            }
            displayTodos()

        })
    })
}