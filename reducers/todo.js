const todo = (state, action) => {
  switch (action.type) {
    case 'add_todo_success':
    alert(23)
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

export default todo;
