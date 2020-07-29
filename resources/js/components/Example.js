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

    const [editTask, setEditTask] = useState(false);
    const [selectId, setSelectId] = useState();

    function loadTask(){
        axios.get('http://127.0.0.1:8000/api/tasks')
            .then((res) => {
                setTasks(res.data);
            });
    }

    function toggleNewModalTask(){
        setNewTask(!newTask);
    }
    
    function toggleEditModalTask(){
        setEditTask(!editTask);
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

    function deleteTask(e){
        const id = e.target.id;
        axios.delete(`http://127.0.0.1:8000/api/task/${id}`);
        loadTask();
    }

    function updateTask(e){
        const id = e.target.id;
        setSelectId(id);
        // console.log(id);
        let name = ''
        let description = '';
        tasks.forEach(task => {
            if(task.id == id){
                // console.log(task.id);
                name = task.name;
                description = task.description;
            }
            // console.log(task.id);
        });
        // console.log(name, description);

        setTitle(name);
        setDesc(description);

        toggleEditModalTask();
    }

    function editSelectTask(){
        axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/task/${selectId}`,
            data: {
                name: title,
                description: desc
            }
        });

        setTitle('');
        setDesc('');

        titleBox.current.value = "";
        descBox.current.value = "";

        loadTask();
        toggleEditModalTask();
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
                    <input ref={ titleBox } className="form-control" type="text"  placeholder="Enter Task Title" onChange={ e => setTitle(e.target.value) } />
                    <textarea ref={ descBox } className="form-control mt-2" type="text" placeholder="Enter Task Description" onChange={ e => setDesc(e.target.value) } />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={ addTask }>Add Task</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={ editTask } className="">
                <div className="modal-header">
                    <div className="ml-auto">
                        <Button className="rounded-circle mx-0" color="danger" onClick={ toggleEditModalTask }>
                            X
                        </Button>
                    </div>
                </div>
                <ModalBody className="">
                    <input ref={ titleBox } id="editTitleBox" value={ title } className="form-control" type="text" onChange={ e => setTitle(e.target.value) } />
                    <textarea ref={ descBox } id="editDescBox" value={ desc } className="form-control mt-2" type="text" onChange={ e => setDesc(e.target.value) } />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={ editSelectTask }>Edit Task</Button>
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
                                    <Button id={`${task.id}`} color="success" size="sm" onClick={ e  => updateTask(e) } className="mr-2">Edit</Button>
                                    <Button id={`${task.id}`} color="danger" size="sm" onClick={ e  => deleteTask(e) }>Delete</Button>
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
