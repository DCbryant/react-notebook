import React, { Component } from 'react';
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut,TodoModel} from './leanCloud'





class App extends Component{
  constructor(props){
      super(props)
      this.state = {
        // 读取上次的user
        user: getCurrentUser() || {},
        newTodo:'',
        todoList:[]
      }

    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }

  
  addTodo(e){
    let newTodo = {
      title:e.target.value,
      status:'',
      deleted:false
    }

    TodoModel.create(newTodo, (id) => {
        newTodo.id = id
        this.state.todoList.push(newTodo)
        this.setState({
          newTodo: '',
          todoList: this.state.todoList
        })
      }, (error) => {
        console.log(error)
    })
  }

  

  changeTitle(e){
    this.setState({
      newTodo:e.target.value,
      todoList:this.state.todoList
    })
  }
 
  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  delete(e,todo){
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }


  signOut(){
      signOut()
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      // 将user重置为一个对象
      stateCopy.user = {}
      this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state)) 
    stateCopy.user = user
    this.setState(stateCopy)
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
        {
          this.state.user.id?
          <div className="Todo">
            <h2>{this.state.user.username||'我'}的待办
              {this.state.user.id ? <i className="fa fa-sign-out" aria-hidden="true" onClick={this.signOut.bind(this)}></i> : null}
            </h2>
            <div className="inputWrapper">
              <TodoInput content={this.state.newTodo} 
                        onChange={this.changeTitle.bind(this)}
                        onSubmit={this.addTodo.bind(this)} />
            </div>
            <ol className="TodoList">
              {todos}
            </ol>
          </div>
          :null
        }
        
        {this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)} 
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    )
  }
}

export default App;