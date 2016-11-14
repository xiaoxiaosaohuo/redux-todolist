import {combineReducers} from 'redux';
import byId,* as fromById from './byId';
import createList,* as fromList from './createList';
// import todo from './todo'

// const byId = (state={},action) =>{
//     switch(action.type){
//         case 'ADD_TODO':
//         case 'TOGGLE_TODO':
//         console.log(action.id)
//          return{
//              ...state,
//              [action.id]:todo(state[action.id],action),
//          };
//          default:
//             return state;
//     }
// }

// const allIds = (state=[],action) =>{
//     switch (action.type) {
//         case 'ADD_TODO':
//             return [...state,action.id]
//         default:
//         return state;
//
//     }
// }

// const todos = combineReducers({
//     byId,
//     allIds
// })

// export const getVisibleTodos = (state, filter) => {
//     const allTodos = getAllTodos(state);
//   switch (filter) {
//     case 'all':
//       return allTodos;
//     case 'completed':
//       return allTodos.filter(t => t.completed);
//     case 'active':
//       return allTodos.filter(t => !t.completed);
//     default:
//       throw new Error(`Unknown filter: ${filter}.`);
//   }
// };

// const getAllTodos = (state) =>
//     state.allIds.map(id => state.byId[id])

const allIds = (state=[],action) =>{
    if(action.filter !=="all"){
        return state
    }
    switch(action.type){
        case "receive_todos":
            return action.response.map(todo =>todo.id);
        // case 'ADD_TODO':
        //     return [...state,action.id]
        default :
            return state;
    }
}

const activeIds = (state=[],action) =>{
    if(action.filter !=="active"){
        return state
    }
    switch(action.type){
        case 'receive_todos':
            return action.response.map(todo =>todo.id);
        default :
            return state;
    }
}

const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case 'receive_todos':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};



const listByFilter = combineReducers({
    all:createList('all'),
    active:createList('active'),
    completed:createList('completed'),
})

const todos = combineReducers({
    byId,
    listByFilter
})

export const  getIsFetching = (state,filter) =>
    fromList.getIsFetching(state.listByFilter[filter])


export const  getErrorMessage = (state,filter) =>
    fromList.getErrorMessage(state.listByFilter[filter])


export const getVisibleTodos = (state,filter) =>{
    const ids =fromList.getIds( state.listByFilter[filter]);
    return ids.map(id =>fromById.getTodo(state.byId,id));
}

export default todos
