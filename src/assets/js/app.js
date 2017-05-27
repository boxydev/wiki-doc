import Application from './Application'
import React from 'react'
import ReactDOM from 'react-dom'

var app = new Application('my-app')

console.log(app)

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);