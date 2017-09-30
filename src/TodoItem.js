import React,{Component} from 'react'

 export default class TodoItem extends Component{

    toggle(e){
        this.props.onToggle(e, this.props.todo)
    }

    delete(e){
        this.props.onDelete(e, this.props.todo)
    }
    render(){
        return(
            <div className="TodoItem">
                <input type="checkbox"
                       checked={this.props.todo.status === 'completed'}
                       onChange = {this.toggle.bind(this)}
                 />
                 <span className="title">{this.props.todo.title}</span>
                 <i className="fa fa-university" aria-hidden="true" onClick={this.delete.bind(this)}></i>
            </div>
        )
    }
}