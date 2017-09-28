import React, { Component } from 'react';
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

let id = 0
function idMaker(){
  id += 1
  return id
}

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      newTodo:'',
      todoList:[
        {id:1,title:'title'},
        {id:2,title:'title2'}
      ]
    }
  }

  
  addTodo(e){
    this.state.todoList.push({
      id:idMaker(),
      title:e.target.value,
      status:null,
      deleted:false
    })

    this.setState({
      newTodo:'',
      todoList:this.state.todoList
    })

  }

  changeTitle(e){
    this.setState({
      newTodo:e.target.value,
      todoList:this.state.todoList
    })
  }
 
  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }

  delete(e,todo){
    todo.deleted = true
    this.setState(this.state)
  }

  render(){
    let todos = this.state.todoList.filter((item)=> !item.deleted).map((item,index) => {
      return (
        <li key={index}>
          <TodoItem todo={item} 
                    onDelete={this.delete.bind(this)}
                    onToggle={this.toggle.bind(this)} 
          />
        </li>
      )
    })

    return(
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
                     onChange={this.changeTitle.bind(this)}
                     onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="TodoList">
          {todos}
        </ol>
      </div>
    )
  }
}

export default App;