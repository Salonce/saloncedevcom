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
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState('');

  const fetchDataWithCsrf = async () => {
    await fetchCsrfToken(); // Wait for the CSRF token to be fetched
    await fetchData();      // Then fetch the data
  };

  useEffect(() => {
    fetchDataWithCsrf();
  }, []);

  const fetchCsrfToken = async () => {
    try {
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

      // Fetch updated data after adding a new task
      fetchData();
      setNewTask('');
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

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskDescription(task.description);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskDescription('');
  };

  const saveTaskDescription = async (taskId: number) => {
    try {
      await fetch(`/todo/task/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // Include CSRF token in headers
        },
        credentials: 'include', // Include credentials (cookies) in the request
        body: JSON.stringify({ description: editingTaskDescription }),
      });

      fetchData();
      cancelEditing();
    } catch (error) {
      console.error('Error updating task description:', error);
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
              <td>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTaskDescription}
                    onChange={(e) => setEditingTaskDescription(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => saveTaskDescription(task.id)}
                      className="btn btn-success btn-sm me-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => switchTaskState(task.id)}
                      className={task.finished ? "btn btn-dark btn-sm me-2" : "btn btn-success btn-sm me-2"}
                    >
                      {task.finished ? 'Undo' : 'Done'}
                    </button>
                    <button
                      onClick={() => startEditingTask(task)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </>
                )}
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
        <button onClick={addTask} className="btn btn-primary">
          Add
        </button>
      </div>
    </div>
  );
};

export default ToDoList;