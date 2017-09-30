import React, {Component} from 'react';

export default class SignInForm extends Component {
  render () {
    return (
      <form className="signIn" onSubmit={this.props.onSubmit}> 
        <h3>注册</h3>
        <div className="row">
          <input type="text" value={this.props.formData.username}
            placeholder="username"
            onChange={this.props.onChange.bind(null, 'username')}/>
        </div>
        <div className="row">
          <input type="password" value={this.props.formData.password}
            placeholder="password"
            onChange={this.props.onChange.bind(null, 'password')}/>
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
          <a href="#" onClick={this.props.onForgotPassword}>忘记密码了？</a>
        </div>
      </form>
    )
  }
}