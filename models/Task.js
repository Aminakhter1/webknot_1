import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Progress','Completed'], default: 'Pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;