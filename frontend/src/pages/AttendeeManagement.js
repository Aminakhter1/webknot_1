
import React, { useState, useEffect } from 'react';
import { fetchAttendees, createAttendee, deleteAttendee } from '../services/api';

function AttendeeManagement() {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchAttendees().then((response) => setAttendees(response.data));
  }, []);

  const validateForm = () => {
    let formErrors = {};
    if (!newAttendee.name.trim()) formErrors.name = 'Name is required.';
    if (!newAttendee.email.trim()) formErrors.email = 'Email is required.';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleCreate = async () => {
    if (!validateForm()) return; // Stop submission if validation fails

    await createAttendee(newAttendee);
    const response = await fetchAttendees();
    setAttendees(response.data);
    setNewAttendee({ name: '', email: '' }); // Clear form
    setErrors({}); // Clear errors
  };

  const handleDelete = async (id) => {
    await deleteAttendee(id);
    const response = await fetchAttendees();
    setAttendees(response.data);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 dashboard">Attendee Management</h2>

      {/* Form for creating new attendees */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newAttendee.name}
                onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newAttendee.email}
                onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Attendee</button>
          </form>
        </div>
      </div>

      {/* Table for displaying attendees */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee, index) => (
              <tr key={attendee._id}>
                <td>{index + 1}</td>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(attendee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendeeManagement;
