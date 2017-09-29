import React, { Component } from 'react';
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
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
    
            
            {this.state.selected === 'signUp' ?
              <SignUpForm formData={this.state.formData}
                onSubmit={this.signUp.bind(this)}             
               onChange={this.changeFormData.bind(this)}
              />
             : 
             null
            }
            
           {this.state.selected === 'signIn' ?
             <SignInForm formData={this.state.formData}
               onChange={this.changeFormData.bind(this)}
               onSubmit={this.signIn.bind(this)}
               onForgotPassword={this.showForgotPassword.bind(this)}
             />
              : 
              null
            }
          </div>
        </div>
      )

      return (
        <div className="UserDialog-Wrapper">
          <div className="UserDialog">
          {
            this.state.selectedTab === 'signInOrSignUp' ?
              <SignInOrSignUp
                formData={this.state.formData}
                onSignIn={this.signIn.bind(this)}
                onSignUp={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onForgotPassword={this.showForgotPassword.bind(this)}
              /> :
              <ForgotPasswordForm
                formData={this.state.formData}
                onSubmit={this.resetPassword.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onSignIn={this.returnToSignIn.bind(this)}
              />
          }
          </div>
        </div>
      )
    }
  }




