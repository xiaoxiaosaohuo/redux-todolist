import {combineReducers} from 'redux';
 const createList = (filter) => {
    // const ids = (state=[],action)=>{
    //     // if(action.filter !==filter){
    //     //     return state
    //     // }
    //     switch (action.type) {
    //         case 'receive_todos':
    //         // console.log(action.response.map(todo => todo.id))
    //             return filter === action.filter?
    //              action.response.map(todo => todo.id):
    //              state
    //         case 'add_todo_success':
    //             return filter !=='completed'?
    //                 [...state,action.response.id]:state
    //         default:
    //             return state;
    //
    //     }
    // }
    const handleToggle = (state,action) =>{
        const {result:toggleId,entities} = action.response;
        const {completed} = entities.todos[toggleId];
        const shouldRemove =(
            (completed && filter === 'active')||
            (!completed && filter === 'completed')
        );
        return shouldRemove ?
            state.filter(id =>id !==toggleId):
            state;
    }
    const ids = (state = [],action) =>{
        switch(action.type){
            case 'receive_todos':
                return filter ===action.filter ?
                action.response.result:state;
            case 'add_todo_success':
             return filter !== 'completed' ?
                [...state,action.response.result]:state;
            case 'toggle_todo_success':
                return handleToggle(state,action);
            default :
                return state;
        }
    }
    const isFetching = (state=false,action) =>{
        if(filter !== action.filter){
            return state;
        }
        switch (action.type) {
            case 'request_todos':
                return true;
            case 'receive_todos':
            case 'fetchTodos_failure':
                return false;
            default:
                return state;

        }
    }
    const errorMessage = (state =null,action)=>{
        if(filter !==action.filter){
            return state;
        }
        switch(action.type){
            case 'fetchTodos_failure':
            return action.message;
            case 'request_todos':
            case 'receive_todos':
            return null;
            default:
            return state;
        }
    }
     return combineReducers({
         ids,
         isFetching,
         errorMessage
     })
}


export default createList;
export const getIds = (state) =>state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state)=>state.errorMessage;
