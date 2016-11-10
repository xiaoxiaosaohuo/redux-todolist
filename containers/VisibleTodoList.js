import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router'
import { getVisibleTodos } from '../reducers'
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

const mapStateToProps = (state,{params}) => ({
  todos: getVisibleTodos(state, params.filter || 'all')
})

// const mapDispatchToProps =  ({
//   onTodoClick: toggleTodo
// })

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  {onTodoClick:toggleTodo}
)(TodoList))

export default VisibleTodoList
