import {createStore} from 'redux'
import reducer from '../reducers'
import {loadState,saveState} from './localStorage'
import throttle from 'lodash/throttle'
const configureStore = ()=>{
	const persistedState = loadState();
	const store = createStore(reducer,persistedState);
	store.dispatch=addLoggToDispatch(store)
	store.subscribe(throttle(()=> {
		saveState({
			todos:store.getState().todos
		})
	},1000))
	return store;
}


const addLoggToDispatch = (store) =>{
	const rawDispatch = store.dispatch;
	return (action) =>{
		console.group(action.type);
		console.log("%c prev state",'color:gray',store.getState());
		console.log('%c action','color:blue',action);
		const returnValue = rawDispatch(action);
		console.log(returnValue)
		console.log('%c next state','color:green',store.getState());
		console.groupEnd(action.type);
		return returnValue;
	}
}

export default configureStore
