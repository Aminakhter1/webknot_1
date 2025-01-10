
import React, { useState, useEffect } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', location: '', date: '' });
  const [editEvent, setEditEvent] = useState(null); // State for the event to be edited
  const [error, setError] = useState(''); // State to hold error messages

  useEffect(() => {
    fetchEvents().then((response) => setEvents(response.data));
  }, []);

  const handleCreate = async () => {
    // Validate new event data
    if (!newEvent.name || !newEvent.description || !newEvent.location || !newEvent.date) {
      setError('All fields are required!');
      // Clear error message after 3 seconds
      setTimeout(() => setError(''), 3000);
      return;
    }
    setError('');
    
    await createEvent(newEvent);
    const response = await fetchEvents();
    setEvents(response.data);
    setNewEvent({ name: '', description: '', location: '', date: '' }); // Clear form
  };

  const handleUpdate = async () => {
    // Validate edit event data
    if (!editEvent.name || !editEvent.description || !editEvent.location || !editEvent.date) {
      setError('All fields are required!');
      // Clear error message after 3 seconds
      setTimeout(() => setError(''), 3000);
      return;
    }
    setError('');

    await updateEvent(editEvent._id, editEvent); // Assuming updateEvent API accepts an ID and the updated event data
    const response = await fetchEvents();
    setEvents(response.data);
    setEditEvent(null); // Clear edit state after updating
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    const response = await fetchEvents();
    setEvents(response.data);
  };

  const handleEdit = (event) => {
    setEditEvent({ ...event }); // Set the event to be edited
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 dashboard">Event Management</h2>

      {/* Display error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Form for creating new events */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Event</button>
          </form>
        </div>
      </div>

      {/* Form for editing an existing event */}
      {editEvent && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={editEvent.name}
                  onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={editEvent.description}
                  onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={editEvent.location}
                  onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={editEvent.date}
                  onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-warning w-100">Update Event</button>
            </form>
          </div>
        </div>
      )}

      {/* Displaying events in a table */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>
                  <button className="btn btn-info btn-sm mx-2" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default EventManagement;
