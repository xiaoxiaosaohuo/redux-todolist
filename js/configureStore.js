import {createStore,applyMiddleware} from 'redux';
// import promise from 'redux-promise';
import createLogger from 'redux-logger';
import reducer from '../reducers';
// import {loadState,saveState} from './localStorage'
// import throttle from 'lodash/throttle'
//

// const promise = (store) =>(next) => (action) =>{
// 	if(typeof action.then ==='function'){
// 		return action.then(next);
// 	}
// 	return next (action);
// }


// const warpDispatchWithMiddlewares = (store,middlewares) =>
// 	middlewares.slice().reverse().forEach(middleware =>
// 		store.dispatch = middleware(store)(store.dispatch)
// 	)

// const addLoggToDispatch = (store) =>{
// 	return (next) =>{
// 		if(!console.group){
// 			return next
// 		}
// 		return (action) =>{
// 			console.group(action.type);
// 			console.log("%c prev state",'color:gray',store.getState());
// 			console.log('%c action','color:blue',action);
// 			const returnValue = next(action);
// 			alert(2)
// 			console.log(returnValue)
// 			console.log('%c next state','color:green',store.getState());
// 			console.groupEnd(action.type);
// 			return returnValue;
// 		}
// 	}
// }

// const addPromiseSupportToDispatch = (store) =>{
// 	const next = store.dispatch;
// 	console.log(next)
// 	return (next) =>{
//
// 		return (action) =>{
// 			if(typeof action.then ==='function'){
// 					console.log(action)
// 					alert(3)
// 				return action.then(next);
// 			}
// 			alert(1)
// 			return next(action);
// 		}
// 	}
// }
// const configureStore = ()=>{
// 	// const persistedState = loadState();
// 	const store = createStore(reducer);
// 	const middlewares = [promise];
// 	// store.dispatch=addLoggToDispatch(store)
// 	// store.subscribe(throttle(()=> {
// 	// 	saveState({
// 	// 		todos:store.getState().todos
// 	// 	})
// 	// },1000))
// 	if(process.env.NODE_ENV !=='production'){
// 		middlewares.push(addLoggToDispatch);
// 	}
// 	// store.dispatch = addPromiseSupportToDispatch(store)
// 	warpDispatchWithMiddlewares(store,middlewares);
// 	return store;
// }
const thunk = (store) => (next) => (action)=>
	typeof action ==='function' ?
	action(store.dispatch,store.getState):
	next(action);

const configureStore = () =>{
	const middlewares =[thunk];
	if(process.env.NODE_ENV!=='production'){
		middlewares.push(createLogger());
	}
	return createStore(
		reducer,
		applyMiddleware(...middlewares)
	)
}
export default configureStore
