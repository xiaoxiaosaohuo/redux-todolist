// import todo from './todo'
// const byId = (state={},action) =>{
//     switch (action.type){
//         case 'receive_todos':
//             const nextState = {...state};
//
//             action.response.forEach(todo =>{
//                 nextState[todo.id] = todo;
//             })
//             return nextState;
// 			case 'add_todo_success':
// 			return {
// 				...state,
// 				[action.response.id]:action.response
// 			}
//         default :
//         return state;
//     }
// }
//
//

const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
};
export default byId
export 	const getTodo = (state,id) => state[id];
