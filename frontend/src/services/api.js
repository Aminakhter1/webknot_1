import axios from 'axios';

const API_BASE_URL = 'https://webknot-1-teci.vercel.app/api';

export const fetchEvents = async () => axios.get(`${API_BASE_URL}/events`);
export const createEvent = async (data) => axios.post(`${API_BASE_URL}/events`, data);
export const updateEvent = async (id, data) => axios.put(`${API_BASE_URL}/events/${id}`, data);
export const deleteEvent = async (id) => axios.delete(`${API_BASE_URL}/events/${id}`);

export const fetchAttendees = async () => axios.get(`${API_BASE_URL}/attendees`);
export const createAttendee = async (data) => axios.post(`${API_BASE_URL}/attendees`, data);
export const deleteAttendee = async (id) => axios.delete(`${API_BASE_URL}/attendees/${id}`);

export const fetchTasksByEvent = async () => axios.get(`${API_BASE_URL}/tasks`);
export const createTask = async (data) => axios.post(`${API_BASE_URL}/tasks`, data);
export const updateTaskStatus = async (id, status) => axios.patch(`${API_BASE_URL}/tasks/${id}`, { status });
