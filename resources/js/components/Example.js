import React, { useState, useEffect, createRef } from 'react';
import ReactDOM from 'react-dom';

import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import axios from 'axios';

function Example() {

    const [newTask, setNewTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const titleBox = createRef();
    const descBox = createRef();

    function loadTask(){
        axios.get('http://127.0.0.1:8000/api/tasks')
            .then((res) => {
                setTasks(res.data);
            });
    }

    function toggleNewModalTask(){
        setNewTask(!newTask);
    }

    function addTask(){

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/task',
            data: {
                name: title,
                description: desc
            }
        });

        titleBox.current.value = "";
        descBox.current.value = "";

        loadTask();
        toggleNewModalTask();
    }

    // function handleChange(e){
    //     [e.target.name] = e.target.value;
    // }

    useEffect(() => {
        loadTask();
    }, [])

    return (
        <div className="container">
            <Button className="my-3 mx-auto d-flex justify-content-center font-weight-bold" color="primary" size="lg" onClick={ toggleNewModalTask }>New Task</Button>
            <Modal isOpen={ newTask } className="">
                <div className="modal-header">
                    <div className="ml-auto">
                        <Button className="rounded-circle mx-0" color="danger" onClick={ toggleNewModalTask }>
                            X
                        </Button>
                    </div>
                </div>
                <ModalBody className="">
                    <input ref={ titleBox } className="form-control" type="text" value={ title } placeholder="Enter Task Title" onChange={ e => setTitle(e.target.value) } />
                    <textarea ref={ descBox } className="form-control mt-2" type="text" placeholder="Enter Task Description" onChange={ e => setDesc(e.target.value) } />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={ addTask }>Add Task</Button>
                </ModalFooter>
            </Modal>
            <Table className="">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task) => (
                            <tr key={ task.id }>
                                <td>{ task.id }</td>
                                <td>{ task.name }</td>
                                <td>{ task.description }</td>
                                <td>
                                    <Button color="success" size="sm" className="mr-2">Edit</Button>
                                    <Button color="danger" size="sm">Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
