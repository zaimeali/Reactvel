import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Table, Button } from 'reactstrap';

function Example() {

    const [tasks, setTasks] = useState([]);

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
                    <tr>
                        <td>1</td>
                        <td>Breakfast</td>
                        <td>Do Breakfast Fast</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2">Edit</Button>
                            <Button color="danger" size="sm">Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
