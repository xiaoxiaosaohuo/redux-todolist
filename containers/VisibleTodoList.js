import React,{Component } from 'react';

import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router'
import { getVisibleTodos } from '../reducers'
import {fetchTodos} from '../api'
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
        const {filter,receiveTodos} = this.props;
        fetchTodos(filter).then(todos =>
            receiveTodos(filter,todos)

        );
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
        const {toggleTodo,...rest} = this.props;
		return <TodoList {...rest} onTodoClick = {toggleTodo}/>
	}
}
const mapStateToProps = (state,{params}) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state,filter),
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
