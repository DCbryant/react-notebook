import React from 'react';
export default function (props) {
  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
      <h3>注册</h3>
      <div className="row">
        <input type="text" value={props.formData.email}
          placeholder="email"
          onChange={props.onChange.bind(null, 'email')}/>
      </div>
      <div className="row">
        <input type="text" value={props.formData.username}
          placeholder="username"
          onChange={props.onChange.bind(null, 'username')}/>
      </div>
      <div className="row">
        <input type="password" value={props.formData.password}
          placeholder="password"
          onChange={props.onChange.bind(null, 'password')}/>
      </div>
      <div className="row actions">
        <button type="submit">注册</button>
      </div>
    </form>
  )
}