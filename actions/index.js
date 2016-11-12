
import * as api from '../api';
import { getIsFetching } from '../reducers';
console.log(api)
export const addTodo = (text) => (dispatch) =>
api.addTodo(text).then(response =>{
    dispatch({
        type:'add_todo_success',
        response,
    })
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
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
        dispatch(receiveTodos(filter,response),error =>{
        dispatch({
            type:'fetchTodos_failure',
            filter,
            message:error.message||'出错了'
        })
        });
    });
}
