import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Table, Button } from 'reactstrap';

import axios from 'axios';

function Example() {

    const [tasks, setTasks] = useState([]);

    function loadTask(){
        axios.get('http://127.0.0.1:8000/api/tasks')
            .then((res) => {
                setTasks(res.data);
            });
    }

    useEffect(() => {
        loadTask();
    }, [])

    return (
        <div className="container">
            <Table>
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
