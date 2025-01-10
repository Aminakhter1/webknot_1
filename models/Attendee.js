import mongoose from 'mongoose';

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

const Attendee = mongoose.model('Attendee', attendeeSchema);
export default Attendee;
