
import React, { useState, useEffect } from 'react';
import { fetchTasksByEvent, createTask, updateTaskStatus } from '../services/api';

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', eventId: '', status: 'Pending' });
  const [errors, setErrors] = useState({ name: '', eventId: '' });

  useEffect(() => {
    // Replace with a specific event ID if needed
    fetchTasksByEvent().then((response) => setTasks(response.data));
  }, []);

  const validateForm = () => {
    let formErrors = {};
    if (!newTask.name.trim()) formErrors.name = 'Task name is required.';
    if (!newTask.eventId.trim()) formErrors.eventId = 'Event ID is required.';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleCreate = async () => {
    if (!validateForm()) return; // Stop submission if validation fails

    await createTask(newTask);
    const eventId = newTask.eventId; // Keep track of the event ID
    const response = await fetchTasksByEvent(eventId);
    setTasks(response.data);
    setNewTask({ name: '', eventId: '', status: 'Not Started' }); // Clear form
    setErrors({}); // Clear errors
  };

  const handleUpdateStatus = async (id, status) => {
    await updateTaskStatus(id, status);
    const eventId = newTask.eventId; // Keep track of the event ID
    const response = await fetchTasksByEvent(eventId);
    setTasks(response.data);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 dashboard">Task Tracker</h2>

      {/* Form for creating new tasks */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Task Name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Event ID"
                value={newTask.eventId}
                onChange={(e) => setNewTask({ ...newTask, eventId: e.target.value })}
              />
              {errors.eventId && <small className="text-danger">{errors.eventId}</small>}
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Progress">Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Task</button>
          </form>
        </div>
      </div>

      {/* Table for displaying tasks */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Task Name</th>
              <th scope="col">Event ID</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.eventId}</td>
                <td>{task.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-2"
                    onClick={() => handleUpdateStatus(task._id, 'In Progress')}
                  >
                    In Progress
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUpdateStatus(task._id, 'Completed')}
                  >
                    Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTracker;
