import React, { Component } from 'react';
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'

export default class UserDialog extends Component{


    constructor(props){
      super(props)
      this.state = {
        selected: 'signUp', // 'signIn'
        selectedTab: 'signInOrSignUp', // 'forgotPassword' | signInOrSignUp
        formData: {
          username: '',
          password: '',
          email: '',
        }
      }
    }
    switch(e){
      this.setState({
        selected: e.target.value
      })
    }

    signUp(e){
         e.preventDefault()
         let {username, password,email} = this.state.formData
         let success = (user)=>{
          //  将username传给app组件，然后显示user
          this.props.onSignUp.call(null, user)
          console.log(user)//这里面有id
         }
         let error = (error)=>{
          switch(error.code){
            case 202:
              alert('用户名已被占用')
              break
            case 201:
              alert('没有提供密码，或者密码为空')
              break
            default:
              alert(error)
              break
          }
         }
         signUp(email,username, password, success, error)
      }

    signIn(e){
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user)=>{
          this.props.onSignIn.call(null, user)
        }
        let error = (error)=>{
          switch(error.code){
            case 210:
              alert('用户名与密码不匹配')
              break
            case 211:
              alert('找不到用户')
              break  
            default:
              alert(error)
              break
          }
        }
        signIn(username, password, success, error)
    }

    changeFormData(key, e){
      let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
      stateCopy.formData[key] = e.target.value
      this.setState(stateCopy)
    }

    showForgotPassword(){
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.selectedTab = 'forgotPassword'
      this.setState(stateCopy)
    }

    resetPassword(e){
      e.preventDefault()
      sendPasswordResetEmail(this.state.formData.email)   
    }
   
    returnToSignIn(){
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.selectedTab = 'signInOrSignUp'
      this.setState(stateCopy)
    }

    render(){
      let signUpForm = (
        <form className="signUp" onSubmit={this.signUp.bind(this)}>
          <div className="row">
            <label>邮箱</label> 
            <input type="text" value={this.state.formData.email}
              onChange={this.changeFormData.bind(this, 'email')}/>
          </div>
          <div className="row">
            <label>用户名</label> 
            <input type="text" value={this.state.formData.username}
              onChange={this.changeFormData.bind(this, 'username')}/>
          </div>
          <div className="row">
            <label>密码</label>
            <input type="password" value={this.state.formData.password} 
              onChange={this.changeFormData.bind(this, 'password')}/>
          </div>
          <div className="row actions">
            <button type="submit">注册</button>
          </div>
        </form>
      )

      let signInForm = (
        <form className="signIn" onSubmit={this.signIn.bind(this)}>
          <div className="row">
            <label>用户名</label>
            <input type="text" value={this.state.formData.username}
              onChange={this.changeFormData.bind(this, 'username')}/>
          </div>
          <div className="row">
            <label>密码</label>
            <input type="password" value={this.state.formData.password} 
              onChange={this.changeFormData.bind(this, 'password')}/>
          </div>
          <div className="row actions">
            <button type="submit">登录</button>
            <a href="#" onClick={this.showForgotPassword.bind(this)}>忘记密码了？</a>
          </div>
        </form>
      )

      let signInOrSignUp = (
        <div className="signInOrSignUp">
          <nav>
            <label>
              <input type="radio" value="signUp" 
                checked={this.state.selected === 'signUp'}
                onChange={this.switch.bind(this)}
              /> 注册</label>
            <label>
              <input type="radio" value="signIn" 
                checked={this.state.selected === 'signIn'}
                onChange={this.switch.bind(this)}
              /> 登录</label>
          </nav>
          <div className="panes">
            {this.state.selected === 'signUp' ? signUpForm : null}
            {this.state.selected === 'signIn' ? signInForm : null}
          </div>
        </div>
      )

      let forgotPassword = (
        <div className="forgotPassword">
          <h3>
            重置密码
          </h3>
          <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}> {/* 登录*/}
            <div className="row">
              <label>邮箱</label>
              <input type="text" value={this.state.formData.email}
                onChange={this.changeFormData.bind(this, 'email')}/>
            </div>
            <div className="row actions">
              <button type="submit">发送重置邮件</button>
              <a href="#" onClick={this.returnToSignIn.bind(this)}>返回登录</a>
            </div>
          </form>
        </div>
      )


      return (
        <div className="UserDialog-Wrapper">
          <div className="UserDialog">
            {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
          </div>
        </div>
      )
    }
  }




