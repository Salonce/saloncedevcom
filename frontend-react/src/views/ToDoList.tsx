import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


interface Task {
    id: number;
    description: string;
    finished: boolean;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [csrfToken, setCsrfToken] = useState<string>('');

  const fetchDataWithCsrf = async () => {
    await fetchCsrfToken(); // Wait for the CSRF token to be fetched
    await fetchData();      // Then fetch the data
  };

  useEffect(() => {
    fetchDataWithCsrf();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      //const response =  await fetch('/api/task', {
        await fetch('/todo/task', {
        method: 'GET',
        credentials: 'include', // Include credentials (cookies) in the request
      });
      const csrfToken = Cookies.get('XSRF-TOKEN');
      
      if (csrfToken) {
        setCsrfToken(csrfToken);
      } else {
        console.error('CSRF token not found in the cookie.');
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/todo/task');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTask = async () => {
    try {
      await fetch('/todo/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // Include CSRF token in headers
        },
        credentials: 'include', // Include credentials (cookies) in the request
        body: JSON.stringify({ description: newTask }),
      });

      //Fetch updated data after adding a new task
      fetchData();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const removeTask = async (taskId: number) => {
    try {
      await fetch(`/todo/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'X-XSRF-TOKEN': csrfToken, // Include CSRF token in headers
        },
        credentials: 'include', // Include credentials (cookies) in the request
      });

      // Fetch updated data after removing a task
      fetchData();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const switchTaskState = async (taskId: number) => {
    try {
      await fetch(`/todo/task/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // Include CSRF token in headers
        },
        credentials: 'include', // Include credentials (cookies) in the request
        body: JSON.stringify({ stateSwitch: true }),
      });

      fetchData();
    } catch (error) {
      console.error('Error marking task as finished:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">To-Do List</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} className={task.finished ? 'table-success' : 'table-light'}>
              <td>{index + 1}</td>
              <td>{task.description}</td>
              <td>
                <button
                  onClick={() => removeTask(task.id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  Remove
                </button>
                <button
                  onClick={() => switchTaskState(task.id)}
                  className={task.finished ? "btn btn-dark btn-sm" : "btn btn-success btn-sm"}
                >
                  {task.finished ? 'undo' : 'done'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-3 d-flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control me-2"
          placeholder="Enter new task"
        />
        <button onClick={addTask} className="btn btn-primary" >
          Add
        </button>
      </div>
    </div>
  );
};

export default ToDoList;