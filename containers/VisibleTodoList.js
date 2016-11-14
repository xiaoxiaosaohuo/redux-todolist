import React,{Component } from 'react';

import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router'
import { getVisibleTodos,getIsFetching,getErrorMessage } from '../reducers'
// import {fetchTodos} from '../api'
// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'all':
//       return todos
//     case 'completed':
//       return todos.filter(t => t.completed)
//     case 'active':
//       return todos.filter(t => !t.completed)
//     default:
//       throw new Error(`Unknown filter:  + ${filter}.`)
//   }
// }

class VisibleTodoList extends Component  {
    fetchData () {
        const { filter, fetchTodos } = this.props;
        fetchTodos(filter).then(() => console.log('done!'));
    }
    componentDidMount (){
        this.fetchData()
    }
    componentDidUpdate(prevProps){
        if(this.props.filter!==prevProps.filter){
            this.fetchData()
        }

    }
	render(){
        const {isFetching,toggleTodo,todos,errorMessage} = this.props;

        if(isFetching && !todos.length){

            return <p> loading...</p>;
        }
        if(errorMessage&&!todos.length){
            return (
                <FetchError
                    message = {errorMessage}
                    onRetry ={() =>this.fetchData()}
                />
            );
        }
        // const {toggleTodo,...rest} = this.props;
		return <TodoList todos = {todos} onTodoClick = {toggleTodo}/>
	}
}
const mapStateToProps = (state,{params}) => {
    const filter = params.filter || 'all';
    return {
        isFetching:getIsFetching(state,filter),
        todos: getVisibleTodos(state,filter),
        errorMessage:getErrorMessage(state,filter),
        filter,
    }
}

// const mapDispatchToProps =  ({
//   onTodoClick: toggleTodo
// })

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoList
