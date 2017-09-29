import React, { Component } from 'react';
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut} from './leanCloud'


let id = 0
function idMaker(){
  id += 1
  return id
}




class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      // 读取上次的user
      user: getCurrentUser() || {},
      newTodo:'',
      todoList:[]
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
        <h1>{this.state.user.username||'我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
                     onChange={this.changeTitle.bind(this)}
                     onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="TodoList">
          {todos}
        </ol>
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