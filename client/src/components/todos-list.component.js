import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//import { Button} from 'react-bootstrap/lib/Button';

// const [show, setShow] = useState(false);

// 


const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}> {props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
            
            <Link to={"/"} onClick={()=>window.c.handleShow(props.todo._id)} style={{color:'red'}}> Delete</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        window.c=this;
        this.state = {todos: [],showToggle:false,deleteid:''};
        this.handleClose=this.handleClose.bind(this);
        this.handleShow=this.handleShow.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    handleClose(flag){
        this.setState({showToggle : false});
        if(flag){
            axios.get('http://localhost:4000/todos/delete/'+this.state.deleteid)
                .then(response => {
                    alert("Deleted Successfully!");
                    this.componentDidMount();
                })
                .catch(function (error){
                    console.log(error);
                })
        }
    
    }
    handleShow(id){
        this.setState({showToggle : true});
        this.setState({deleteid : id});
    }
    todoList() {
        var self=this;
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo}  key={i} />;
        })
    }
    render() {
        return (
            
             <div>
                 <Modal show={this.state.showToggle} onHide={()=>this.handleClose(this,false)} >
                <Modal.Header >
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete?</Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => this.handleClose(false)} >
                            No!
                        </Button>
                        <Button variant="primary" style={{backgroundColor:'red'}} onClick={() => this.handleClose(true)}>
                            Yeah!
                        </Button>
                    </Modal.Footer>
            </Modal>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}