import {combineReducers} from 'redux';
 const createList = (filter) => {
    const ids = (state=[],action)=>{
        if(action.filter !==filter){
            return state
        }
        switch (action.type) {
            case 'receive_todos':
            // console.log(action.response.map(todo => todo.id))
                return action.response.map(todo => todo.id);

            default:
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
