import React, { Component } from 'react';
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
import $ from 'jquery'
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

         let dataCorrect = true;
         if(email.match(/@/) === null){
             alert('请填写正确的邮箱地址')
             dataCorrect = false;
         }
         if(username.length < 3){
             alert('用户名长度至少为3个字符，请重新填写')
             dataCorrect = false;
         }
         if(password.length < 6){
             alert('密码长度至少为6位，请重新填写')
             dataCorrect = false;
         }
 
         if(!dataCorrect){
             return;
         }


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
                case 203:
                alert('邮箱已被占用')
                break
                case 210:
                alert('用户名和密码不匹配')
                break
                case 211:
                alert('该用户不存在')
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
              case 100:
                  alert('无法连接到服务器，请检查网络连接')
                  break
              case 201:
                  alert('密码不能为空');
                  break;
              case 202:
                  alert('用户名已被占用')
                  break
              case 203:
                  alert('邮箱已被占用')
                  break
              case 210:
                  alert('用户名和密码不匹配')
                  break
              case 211:
                  alert('该用户不存在')
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

    showSignUp(){
      $('.UserDialog .panes').animate({
          left: 0,
      },300)
    }

    showLogin(){
        $('.UserDialog .panes').animate({
            left: 287,
        },300)
    }

    render(){
      let signInOrSignUp = (
        <div className="signInOrSignUp">
          <nav>
            <div className="dialog up">
              <p>还没有账户?</p>
                <label>
                  <input type="radio" value="signUp" 
                    checked={this.state.selected === 'signUp'}
                    onChange={this.switch.bind(this)}
                    onClick={this.props.onShowSignUp}
                  /> 注册</label>
            </div>
            <div className="dialog up">
              <p>已经有账户?</p>
              <label>
                <input type="radio" value="signIn" 
                    checked={this.state.selected === 'signIn'}
                    onChange={this.switch.bind(this)}
                    onClick={this.props.onShowLogin}
                  /> 登录
              </label>
            </div>             
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
                onShowSignUp={this.showSignUp.bind(this)}
                onShowLogin={this.showLogin.bind(this)}
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




