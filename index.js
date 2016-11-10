import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import configureStore from './js/configureStore'
import Root from './components/root'
import {fetchTodos} from './api'

console.log(fetchTodos)
fetchTodos('all').then(todos =>
console.log(todos)
)
const store = configureStore();
render(
  <Root store={store}>
  </Root>,
  document.getElementById('root')
)
