import React, {Component} from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'


export default class SignInOrSignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'signUp'
    }
  }

  switch (e) {
    this.setState({
      selected: e.target.value
    })
  }

  render(){
      return(
        <div className="signInOrSignUp">
            <nav>
                <div className="dialog up">
                    <p>还没有账户?</p>
                    <label>
                        <input type="radio" value="signUp" 
                            checked={this.state.selected === 'signUp'}
                            onChange={this.switch.bind(this)}
                            onClick={this.props.onShowSignUp}
                        />注册</label>
                </div>
                <div className="dialog in">
                    <p>已经有账户?</p>
                    <label>
                        <input type="radio" value="signIn" 
                            checked={this.state.selected === 'signIn'} 
                            onChange={this.switch.bind(this)}
                            onClick={this.props.onShowLogin}
                        /> 登录</label>
                </div>
                <div className="panes">
                    {this.state.selected === 'signUp' ? 
                        <SignUpForm formData={this.props.formData}
                            onSubmit={this.props.onSignUp}
                            onChange={this.props.onChange} 
                        />
                        : null}
                    {this.state.selected === 'signIn' ? 
                        <SignInForm formData={this.props.formData}
                            onChange={this.props.onChange}
                            onSubmit={this.props.onSignIn}
                            onForgotPassword={this.props.onForgotPassword} 
                        />
                        : null}
                </div>
            </nav>
        </div>
      )
  }
}