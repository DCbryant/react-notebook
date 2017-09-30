import React,{Component} from 'react'

 export default class TodoInput extends Component{

    submit(e){
        if(e.key === 'Enter'){
            if(this.props.onSubmit){
                this.props.onSubmit(e)
            }
        }
    }

    changeTitle(e){
        if(this.props.onChange){
            this.props.onChange(e)
        }
    }
    render(){
        return(
            <input type="text" className="TodoInput"
                placeholder="今天要做什么呢？"
                onChange={this.changeTitle.bind(this)}
                value={this.props.content} 
                onKeyPress={this.submit.bind(this)} />
        )
    }
}