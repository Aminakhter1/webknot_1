import Attendee from '../models/Attendee.js';

export const getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAttendee = async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    const savedAttendee = await attendee.save();
    res.status(201).json(savedAttendee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAttendee = async (req, res) => {
  try {
    await Attendee.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
