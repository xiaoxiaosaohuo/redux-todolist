import {normalize} from 'normalizr';
import * as schema from './schema';
import * as api from '../api';
import { getIsFetching } from '../reducers';
console.log(schema)
export const addTodo = (text) => (dispatch) =>
api.addTodo(text).then(response =>{
    console.log('normalize response',normalize(response,schema.todo))
    dispatch({
        type:'add_todo_success',
        response:normalize(response,schema.todo),
    })
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
export const toggleTodo =(id) => (dispatch) =>
    api.toggleTodo(id).then(response =>{
        dispatch({
            type:'toggle_todo_success',
            response:normalize(response,schema.todo)
        })
    })
// export const toggleTodo = (id) => ({
//   type: 'TOGGLE_TODO',
//   id
// })
const receiveTodos = (filter,response) =>({
        type:'receive_todos',
        filter,
        response
})
const requestTodos = (filter) =>({
    type:'request_todos',
    filter,
})
export const fetchTodos = (filter) =>(dispatch,getState)=>{
    if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
    dispatch(requestTodos(filter));

    return api.fetchTodos(filter).then(response =>{
        console.log('normalize response',normalize(response,schema.arrayOfTodos))
        dispatch({
            type:'receive_todos',
            filter,
            response:normalize(response,schema.arrayOfTodos),
        })
        },
        error =>{
        dispatch({
            type:'fetchTodos_failure',
            filter,
            message:error.message||'出错了'
        })
    });
}
